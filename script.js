const useHash = true;
const apiUrl = 'https://lucasreta.com/stack-overflow/spa-vanilla-js/api';
const routes = ['section-1', 'section-2'];
const content_box = document.getElementById("content_box");

function get(page) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(xhr.responseText);
      content_box.innerHTML = data.content;
      const title = `${data.title} | App Manual`;
      document.title = title;
      window.history.pushState(
        { 'content': data.content, 'title': title},
        title,
        useHash ?
          `#${page}` :
          page
      );
    }
  };
  xhr.open('GET', `${apiUrl}/${page}`, true);
  xhr.send();
}

window.addEventListener("popstate", function(e) {
  const state = e.state;
  content_box.innerHTML = state.content;
  document.title = e.title;
});

const links = document.getElementsByClassName('link');
for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(event) {
    event.preventDefault();
    get(links[i].href.split('/').pop());
  }, false);
}

(function(fn = function() {
  const page = useHash ?
    window.location.hash.split('#').pop() :
    window.location.href.split('/').pop();
  get(routes.indexOf(page) >= 0 ? page : routes[0]);
}) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})();