var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
    var altText = images[i].getAttribute("alt");
    var figcaption = document.createElement("figcaption");
    figcaption.innerHTML = altText;
    images[i].insertAdjacentElement("afterend", figcaption);
}
