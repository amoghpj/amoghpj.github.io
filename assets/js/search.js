console.log("test");


var expand_button = document.querySelector('.expand');

var sidebar_collapsed = false;

console.log(sidebar_collapsed);


expand_button.addEventListener("click", function(){
    var sidebar1 =  document.querySelector('.sidebar');
    var sidebar2 =  document.querySelector('.sidebar-right');
    var icon =  document.getElementById('button');
    var defaultpage = document.querySelector('.default')
    console.log(sidebar_collapsed);
    sidebar1.classList.toggle('sidebar-hidden', !sidebar_collapsed);
    sidebar2.classList.toggle('sidebar-hidden', !sidebar_collapsed);
    defaultpage.classList.toggle('defaultexpand', !sidebar_collapsed);
    if (!sidebar_collapsed){
        icon.src = "/assets/images/button-hide-1.svg";}
    else{
        icon.src = "/assets/images/button-reveal-1.svg";
    }
    sidebar_collapsed = !sidebar_collapsed;
}
)

// Search stuff

var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json'
})
