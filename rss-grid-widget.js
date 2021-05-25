(function () {
  
  const container = document.querySelector('[data-src-rss]');
  const rssUrl = container.getAttribute('data-src-rss');
  
  const _addHtml = function (items, description, url) {
    let descriptionHtml = `<h2 class="grid-rss__title">${description.innerHTML}</h2>`;
    let itemsHtml = `<div class="grid-rss__row">`;
    items.forEach(el => {
      itemsHtml += `
        <div class="grid-rss__col">
          <a href="${el.querySelector('link').innerHTML}" class="grid-rss__item" target="_blank">
            <div>
                <div class="grid-rss__img-container" style="background-image:url('${el.querySelector('enclosure').getAttribute('url')}');"></div>
            </div>
            <div>
                <div class="grid-rss__item-title">
                    <span class="grid-rss__item-title__text">${el.querySelector('title').innerHTML}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5"><path d="M271,1.7l-145.4.8a16.22,16.22,0,0,0-16.1,16.1v.2a15.79,15.79,0,0,0,16,15.7L228.6,34,182.1,80.5H13a10.47,10.47,0,0,0-7.4,3.2A10.62,10.62,0,0,0,1.4,92V268.5c0,7.3,5.2,13.3,11.6,13.3H189.4c6.4,0,11.6-6,11.6-13.3V103.8L249.8,55l-.6,103.2v.2a15.83,15.83,0,0,0,15.9,15.7A16.22,16.22,0,0,0,281.2,158L282,12.7v-.2A10.74,10.74,0,0,0,271,1.7ZM171.1,252H31.2V110.3H152.3l-40.8,40.8a13.28,13.28,0,0,0,0,18.8l2.3,2.3a13.28,13.28,0,0,0,18.8,0l38.6-38.6V252Z"/></svg>
                </div>
            </div>
          </a>
        </div>
      `;
    });
    itemsHtml += `<div class="grid-rss__col">
          <a href="${url.innerHTML}" class="grid-rss__item grid-rss__item--show-more" target="_blank">
            <svg aria-hidden="true" focusable="false" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.6 121.6">
              <g id="add">
                <path id="add-2" class="" d="M55.6,0V55.6H0V66H55.6v55.6H66V66h55.6V55.6H66V0Z">
              </path></g>
            </svg>
          </a>
        </div>`;
    itemsHtml += `</div>`;
    container.insertAdjacentHTML('beforeend', descriptionHtml);
    container.insertAdjacentHTML('beforeend', itemsHtml);
    container.removeAttribute('data-src-rss');
    container.classList.add('grid-rss');
  };
  
  const _fetchItems = function () {
    fetch(rssUrl)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        console.log('Rss widget:');
        console.log(data);
        let items = data.querySelectorAll('item');
        let description = data.querySelector('description');
        let url = data.querySelectorAll('link')[1];
        let itemsArray = Array.from(items);
        if (itemsArray.length > 3) {
          itemsArray = itemsArray.slice(0, 3);
        }
        _addHtml(itemsArray, description, url);
      });
  };
  
  const _addStyles = function () {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'http://127.0.0.1:8080/rss-grid-widget.css');
    // link.setAttribute('href', 'https://karvas.github.io/rss-grid-widget/rss-grid-widget.css');
    document.head.appendChild(link);
  };
  
  const _init = function () {
    _addStyles();
    _fetchItems();
  };
  
  _init();
  
})();
