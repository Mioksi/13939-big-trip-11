import API from './api/api';
import FilterController from './controllers/filter';
import MenuComponent from './components/header/menu/menu';
import PointsModel from './models/points';
import StatisticsComponent from './components/header/statistics/statistics';
import TripController from './controllers/trip';
import TripInfoComponent from './components/header/trip-info/trip-info';
import LoadingEventsComponent from './components/main/event/loading-events';
import {AUTHORIZATION, END_POINT, Place, MenuItem} from './common/consts';
import {render, remove} from './common/utils/render';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);
const eventAddButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const pointsModel = new PointsModel();

  const loadingEvents = new LoadingEventsComponent();
  const menuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent(pointsModel);
  const tripController = new TripController(tripEvents, eventAddButton, pointsModel, api);
  const filterController = new FilterController(secondTitle, pointsModel);

  const showTable = () => {
    menuComponent.setActiveItem(MenuItem.TABLE);
    statisticsComponent.hide();
    tripController.show();
  };

  const showStats = () => {
    menuComponent.setActiveItem(MenuItem.STATS);
    tripController.hide();
    statisticsComponent.show();
  };

  const menuTab = {
    'Table': showTable,
    'Stats': showStats,
  };

  const onAddEventButtonClick = () => {
    showTable();

    filterController.setDefaultFilter();
    tripController.createPoint();
  };

  render(firstTitle, menuComponent, Place.AFTEREND);
  filterController.render();
  render(tripEvents, loadingEvents);

  render(tripEvents, statisticsComponent);
  statisticsComponent.hide();

  menuComponent.setMenuItemChangeHandler((menuItem) => menuTab[menuItem]());

  eventAddButton.addEventListener(`click`, onAddEventButtonClick);

  Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
    .then(([points, offers, destinations]) => {
      pointsModel.setPoints(points);
      pointsModel.setOffers(offers);
      pointsModel.setDestinations(destinations);
      remove(loadingEvents);
      render(tripMain, new TripInfoComponent(points), Place.AFTERBEGIN);
      tripController.render();
    });
};

init();
