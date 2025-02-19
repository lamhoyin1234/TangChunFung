const cssFile = getComputedStyle(document.documentElement);
const timelineTranslateXValue = cssFile.getPropertyValue('--timelineTranslateXValue').trim();
let lang="en";
/*
function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}
*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vw', `${vw}px`);

$(document).on("scroll", function () {
  var pageTop = $(document).scrollTop();
  //var pageBottom = pageTop + $(window).height();
  var pageBottom = pageTop + $(window).innerHeight();
  var tags = $(".timeline");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
});

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
});

//multi lang function
//#region 
// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (element.tagName === "INPUT" && key === "placeholder_text") {
      // If the element is an input with placeholder_text attribute, set placeholder
      element.placeholder = langData[key];
    } else {
      // For other elements, set text content
      //element.textContent = langData[key];
      element.innerHTML = langData[key];
    }
  });
}

// Function to change language
async function changeLanguage(mlang) {
  lang = mlang;
  await setLanguagePreference(mlang);
  const langData = await fetchLanguageData(mlang);
  updateContent(langData);
  //
  //optional: some lang had different orientation(read from right to left)
  //toggleArabicStylesheet(lang); // Toggle Arabic stylesheet
}

// Function to toggle Arabic stylesheet based on language selection
/*
function toggleArabicStylesheet(lang) {
  const head = document.querySelector("head");
  const link = document.querySelector("#styles-link");

  if (link) {
    head.removeChild(link); // Remove the old stylesheet link
  } else if (lang === "ar") {
    const newLink = document.createElement("link");
    newLink.id = "styles-link";
    newLink.rel = "stylesheet";
    newLink.href = "./assets/css/style-ar.css"; // Path to Arabic stylesheet
    head.appendChild(newLink);
  }
}
*/

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  //toggleArabicStylesheet(userPreferredLanguage);
});
//#endregion

function scrollTo(id) {
  if (document.getElementById(id).classList.contains("visible")) {
    $('html,body').animate({ scrollTop: $("#" + id).offset().top }, 'slow');
  }
  else {
    $('html,body').animate({ scrollTop: $("#" + id).offset().top - 10 * vh /*vh(10)*/ }, 'slow');
  }
}

async function scrollPageTo(id) {
  await scrollTo(id);
}
