(function () {

  const container = document.querySelector('[data-src-rss]');
  const rssUrl = container.getAttribute('data-src-rss');
  const containerInnerHtml = `<div class="grid-rss__inner"></div>`;

  const _addHtml = function (items, description, url, category) {
    container.insertAdjacentHTML('beforeend', containerInnerHtml);
    const containerInner = container.querySelector('.grid-rss__inner');
    let descriptionHtml = `<h2 class="grid-rss__title">${description.innerHTML}</h2>`;
    let itemsHtml = `<div class="grid-rss__row">`;
    let iconVideo = ``;
    if (category === 'Vidéo') {
      iconVideo = `<svg aria-hidden="true" alt="" focusable="false" data-prefix="fab" data-icon="youtube" class="svg-inline--fa fa-youtube fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>`
    }
    items.forEach(el => {
      itemsHtml += `
        <div class="grid-rss__col">
          <a href="${el.querySelector('link').innerHTML}" class="grid-rss__item" title="${el.querySelector('title').innerHTML} (ouvre un nouvel onglet - site externe)" target="_blank">
            <div>
                <div class="grid-rss__img-container" style="background-image:url('${el.querySelector('enclosure').getAttribute('url')}');">
                    ${iconVideo}
                </div>
            </div>
            <div>
                <div class="grid-rss__item-title">
                    <span class="grid-rss__item-title__text">${el.querySelector('title').innerHTML}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" alt="" aria-hidden="true" version="1.0" id="Calque_1" x="0px" y="0px" viewBox="0 0 283.5 283.5" style="enable-background:new 0 0 283.5 283.5;" xml:space="preserve">
                    <g id="Composant_21_7" transform="translate(0 0.5)">
                    <g id="Rectangle_171" transform="translate(0 2.042)">
                    <rect x="25.6" y="73.6" style="fill:none;" width="183" height="183"/>
                    <path style="fill:#60C6F2;" d="M208.6,256.6h-183v-183h183V256.6z M46,236.2h142.3V93.9H46V236.2z"/>
                    </g>
                    <polygon style="fill:#60C6F2;" points="257.9,145.5 237.5,145.5 237.5,44.2 138.8,44.2 138.8,23.9 257.9,23.9  "/>
                    </g>
                    </svg>
                </div>
            </div>
          </a>
        </div>
      `;
    });
    itemsHtml += `<div class="grid-rss__col">
          <a href="${url.innerHTML}" class="grid-rss__item grid-rss__item--show-more" target="_blank">
            <div class="__inner">
                <div>
                    <div>
                      <svg version="1.1" aria-hidden="true" id="edc44901-d513-4c42-a217-cba340842bd8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 85 83" style="enable-background:new 0 0 85 83;" xml:space="preserve">
                        <polygon points="44,40 44,0 41,0 41,40 0,40 0,43 41,43 41,83 44,83 44,43 85,43 85,40 "></polygon>
                      </svg>
                    </div>
                    <div>
                        <p>
                        <span class="__text">Toute l'info</span>&nbsp;<span class="__icon-external"><svg role="img" aria-hidden="true" alt="" id="f0e66a82-9691-4c5a-8636-9953692f0b2f" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232.3 234.74" fill="currentColor">
                            <rect y="51.74" height="183"></rect>
                            <path d="M0,234.74H183v-183H0ZM20.4,72H162.7v142.3H20.4Z" transform="translate(0 0)"></path>
                            <polygon points="113.2 0 113.2 20.3 211.9 20.3 211.9 121.6 232.3 121.6 232.3 0 113.2 0"></polygon>
                            </svg>
                        </span>
                        </p>
                    </div>
               </div>
            </div>
          </a>
        </div>`;
    itemsHtml += `</div>`;
    containerInner.insertAdjacentHTML('beforeend', descriptionHtml);
    containerInner.insertAdjacentHTML('beforeend', itemsHtml);
    container.removeAttribute('data-src-rss');
    container.classList.add('grid-rss');
  };

  const _fetchItems = function () {
    fetch(rssUrl)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        let items = data.querySelectorAll('item');
        let description = data.querySelector('description');
        let url = data.querySelectorAll('link')[1];
        let category = data.querySelector('category').innerHTML;
        let itemsArray = Array.from(items);
        if (itemsArray.length > 3) {
          itemsArray = itemsArray.slice(0, 3);
        }
        _addHtml(itemsArray, description, url, category);
      });
  };

  const _addStyles = function () {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    // link.setAttribute('href', 'http://localhost:8080/rss-grid-widget.css');
    link.setAttribute('href', 'https://karvas.github.io/rss-grid-widget/rss-grid-widget.css');
    document.head.appendChild(link);
  };

  const _init = function () {
    _addStyles();
    _fetchItems();
  };

  _init();

})();
