import {createOffers} from './components/event-offers';
import {getEventInfo} from './common/event-info';
import AbstractComponent from '../../abstracts/abstract-component';

const createEventItem = (event) => {
  const {type, destination, price, offers} = event;
  const {name} = destination;
  const {start, end, eventType, startIsoDate, endIsoDate, timeDifference} = getEventInfo(event);

  return (
    `<div class="event">
       <div class="event__type">
         <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
       </div>
       <h3 class="event__title">${eventType} ${name}</h3>
       <div class="event__schedule">
         <p class="event__time">
           <time class="event__start-time" datetime="${startIsoDate}">${start}</time>
           &mdash;
           <time class="event__end-time" datetime="${endIsoDate}">${end}</time>
         </p>
         <p class="event__duration">${timeDifference}</p>
       </div>
       <p class="event__price">
         &euro;&nbsp;<span class="event__price-value">${price}</span>
       </p>
       <h4 class="visually-hidden">Offers:</h4>
       <ul class="event__selected-offers">
         ${createOffers(offers)}
       </ul>
       <button class="event__rollup-btn" type="button">
         <span class="visually-hidden">Open event</span>
       </button>
     </div>`
  );
};

export default class EventItem extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventItem(this._event);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
