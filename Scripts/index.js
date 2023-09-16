// create elements function
function createE(element, text, className, id) {
  if (element !== undefined) {
    let ele = document.createElement(element);

    if (text === false) {
    } else if (text !== undefined) {
      ele.textContent = text;
    }

    if (className === false) {
    } else if (className !== undefined) {
      ele.className = className;
    }

    if (id !== undefined) {
      ele.id = id;
    }

    return ele;
  } else {
    console.warn("Your creatE Function Is Empty");
  }
}

// filters
let filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function () {
  let filter = document.querySelector(".filter");
  let disCheck = window.getComputedStyle(filter).display;

  if (disCheck === "none") {
    filter.style.display = "flex";
    this.children[1].style.rotate = "180deg";
  } else {
    filter.style.display = "none";
    this.children[1].style.rotate = "0deg";
  }
});

// fetching data
async function data() {
  try {
    const response = await fetch("./Data/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error Fetching Data", error);
  }
}

const mainData = document.getElementById("main-data");

function getDataInThePage(e) {
  let link = document.createElement("a");
  link.href = `/details.html?id=${e.alpha2Code}`;
  link.target = "_blank";
  link.className = "country-link";

  let box = createE("div", false, "box");
  link.appendChild(box);

  let photo = document.createElement("img");
  photo.src = e.flag;
  photo.alt = e.name;
  box.appendChild(photo);

  let text = createE("div", false, "text");
  box.appendChild(text);

  let name = document.createElement("h2");
  name.textContent = e.name;
  text.appendChild(name);

  let population = document.createElement("p");
  population.innerHTML = `Population: <span>${e.population}</span>`;
  text.appendChild(population);

  let region = document.createElement("p");
  region.innerHTML = `Region: <span>${e.region}</span>`;
  text.appendChild(region);

  let capital = document.createElement("p");
  capital.innerHTML = `Capital: <span>${e.capital}</span>`;
  text.appendChild(capital);

  mainData.appendChild(link);
}

data().then((data) => {
  data.length = 8;

  data.forEach((e) => getDataInThePage(e));
});

const filter = document.querySelector(".filter");

filter.addEventListener("click", function (e) {
  if (e.target !== this) {
    mainData.textContent = "";
    data().then((data) => {
      data.forEach((ele) => {
        if (ele.region === e.target.dataset.region) {
          getDataInThePage(ele);
        }
      });
    });

    if (document.getElementById("message") !== null) {
      document.getElementById("message").remove();
    }
  }
});

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const inpVal = document.getElementById("search").value;
  if (inpVal.length > 0) {
    mainData.textContent = "";
    data().then((data) => {
      data.forEach((ele) => {
        if (ele.name.toLowerCase().includes(inpVal.toLowerCase())) {
          getDataInThePage(ele);
          if (document.getElementById("message") !== null) {
            document.getElementById("message").remove();
          }
        }
      });
    });

    if (document.getElementById("message") === null) {
      let message = createE(
        "h1",
        `There Is No Country Named ${inpVal}`,
        false,
        "message"
      );
      message.style.textAlign = "center";
      message.style.wordWrap = "break-word";
      mainData.after(message);
    } else {
      document.getElementById(
        "message"
      ).textContent = `There Is No Country Named ${inpVal}`;
    }
  }
});
