const umbrella_img = document.querySelector(".umbrella-img");
const colors_btn = document.querySelectorAll("#colors-btn");
const upload_file_input = document.querySelector("#upload-file-input");
const upload_logo_text = document.querySelector(".upload-logo-text");
const fa_times = document.querySelector(".fa-times");
const upload_file_container = document.querySelector(".upload-file-container");
const brand_logo = document.querySelector("#brand-logo");
const loader = document.querySelector(".loader");
const body = document.querySelector("body");
const colors_list_container = document.querySelector(".colors-list-container");

const allImagesDatabase = [
  {
    id: 0,
    src: "/asset/Pink umbrella.png",
    color: "#FFC0CB",
    borderColor: "#C71585",
    backgroundColor: "#FDE0E5",
  },
  {
    id: 1,
    src: "/asset/Blue umbrella.png",
    color: "#6495ED",
    borderColor: "#0000FF",
    backgroundColor: "#D9ECF8",
  },
  {
    id: 2,
    src: "/asset/Yello umbrella.png",
    color: "#FFFF00",
    borderColor: "#FEBE10",
    backgroundColor: "#FFFFBE",
  },
];

let currentUmbrella = {
  color: "#6495ED",
  src: "/asset/Blue umbrella.png",
};

umbrella_img.src = currentUmbrella.src;
var uploaded_image = "";
body.style.backgroundColor = allImagesDatabase[1].backgroundColor;
upload_file_container.style.backgroundColor = allImagesDatabase[1].borderColor;

fa_times.style.display = "none";
brand_logo.style.display = "none";
loader.style.display = "none";

const createColorOptions = (c) => {
  var div = document.createElement("div");
  colors_list_container.appendChild(div);
  div.id = "colors-btn";
  div.style.backgroundColor = c.color;
};

allImagesDatabase.map((newColor) => createColorOptions(newColor));

colors_list_container.children[1].style.border = `4px solid ${allImagesDatabase[1].borderColor}`;

function updateUmbrellaColor(indexOfSelectedColor) {
  currentUmbrella.color = allImagesDatabase[indexOfSelectedColor].color;
  currentUmbrella.src = allImagesDatabase[indexOfSelectedColor].src;
  for (const img in allImagesDatabase) {
    if (allImagesDatabase[img].color === currentUmbrella.color) {
      colors_list_container.children[
        img
      ].style.border = `4px solid ${allImagesDatabase[img].borderColor}`;
      body.style.backgroundColor = allImagesDatabase[img].backgroundColor;
      upload_file_container.style.backgroundColor =
        allImagesDatabase[img].borderColor;
    } else {
      colors_list_container.children[img].style.border = "none";
    }
  }
  umbrella_img.src = currentUmbrella.src;
  umbrella_img.classList.add("fade");
  brand_logo.classList.add("fade");
  setTimeout(() => {
    loader.classList.add("rotate");
    loader.style.display = "block";
  }, 500);
  setTimeout(() => {
    loader.classList.remove("rotate");
    umbrella_img.classList.remove("fade");
    brand_logo.classList.remove("fade");
    loader.style.display = "none";
  }, 2000);
}

//Event listeners
for (let i = 0; i < colors_list_container.children.length; i++) {
  const colorOptionBtn = colors_list_container.children[i];
  colorOptionBtn.addEventListener("click", () => updateUmbrellaColor(i));
}

upload_file_input.addEventListener("change", (e) => {
  if (brand_logo.src !== "") {
    fa_times.style.display = "block";
    brand_logo.style.display = "block";
    upload_logo_text.innerText = e.target.files[0].name;
    upload_logo_text.style.fontSize = "18px";
  }
  brand_logo.src = URL.createObjectURL(e.target.files[0]);
});

fa_times.addEventListener("click", () => {
  brand_logo.src = "";
  fa_times.style.display = "none";
  brand_logo.style.display = "none";
  upload_logo_text.innerText = "UPLOAD LOGO";
  upload_logo_text.style.fontSize = "24px";
  console.log("hello");
});
