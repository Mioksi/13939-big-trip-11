import {EVENTS_AMOUNT} from '../../common/consts';
import {generateTripEvents} from "../../mock/event";
import {createDayInfo} from './day-info';
import {createEventList} from '../event/event-list';

const events = generateTripEvents(EVENTS_AMOUNT);

events.sort((first, second) => first.startTime - second.startTime);

const createDayItem = () => (
  `<li class="trip-days__item  day">
    ${createDayInfo()}
    <ul class="trip-events__list">
    ${createEventList(events.slice(1))}
    </ul>
  </li>`
);

export {events, createDayItem};