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

async function data() {
  try {
    const response = await fetch("../Data/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error Fetching Data", error);
  }
}

data().then((data) => {
  for (let i = 0; i < data.length; i++) {
    if (location.search.split("=")[1] === data[i].alpha2Code) {
      let country = createE("div", false, "country");
      let container = createE("div", false, "container");
      let img = document.createElement("img");
      img.src = data[i].flag;
      img.alt = data[i].name;
      let countryInfo = createE("div", false, "country-info");
      let name = createE("h2", data[i].name);
      let lists = createE("div", false, "lists");
      let firstList = createE("div", false, "first-list");
      let nativeName = document.createElement("span");
      nativeName.innerHTML = `Native Name: <span class="fade">${data[i].nativeName}</span>`;
      let population = document.createElement("span");
      population.innerHTML = `Population: <span class="fade">${data[i].population}</span>`;
      let region = document.createElement("span");
      region.innerHTML = `Region: <span class="fade">${data[i].region}</span>`;
      let subRegion = document.createElement("span");
      subRegion.innerHTML = `Sub Region: <span class="fade">${data[i].subregion}</span>`;
      let capital = document.createElement("span");
      capital.innerHTML = `Capital: <span class="fade">${data[i].capital}</span>`;
      let secondList = createE("div", false, "second-list");
      let topLvlDomain = document.createElement("span");
      topLvlDomain.innerHTML = `Top Level Domain: <span class="fade">${data[i].topLevelDomain}</span>`;
      let currencies = document.createElement("span");
      currencies.innerHTML = `Currencies: <span class="fade">${data[i].currencies[0].name}</span>`;
      let language = document.createElement("span");
      language.innerHTML = `Language: <span class="fade">${data[i].languages[0].name}</span>`;
      let border = createE("div", false, "border");
      let borderCountries = document.createElement("p");
      if (typeof data[i].borders !== "undefined") {
        console.log(data[i].borders);
        borderCountries.innerHTML = `Border Countries: <span class="parent">${data[
          i
        ].borders
          .map((e) => `<span>${e}</span>`)
          .join("")}</span>`;
      } else {
        borderCountries.textContent = "There Is No Data About The Borders";
      }

      container.appendChild(img);
      container.appendChild(countryInfo);
      countryInfo.appendChild(name);
      firstList.appendChild(nativeName);
      firstList.appendChild(population);
      firstList.appendChild(region);
      firstList.appendChild(subRegion);
      firstList.appendChild(capital);
      lists.appendChild(firstList);
      secondList.appendChild(topLvlDomain);
      secondList.appendChild(currencies);
      secondList.appendChild(language);
      lists.appendChild(secondList);
      countryInfo.appendChild(lists);
      border.appendChild(borderCountries);
      countryInfo.appendChild(border);
      country.appendChild(container);

      document.title = data[i].name;
      document.body.append(country);
      break;
    }
  }
});
