import EventItemComponent from '../event-item';
import EventEditComponent from '../event-edit';
import {isEscEvent} from '../../../../common/utils/helpers';
import {render, replace} from '../../../../common/utils/render';

const renderEvent = (container, event) => {
  const eventItemComponent = new EventItemComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventItemComponent, eventEditComponent);
  };

  const onFormEscPress = (evt) => {
    isEscEvent(evt, replaceEditToEvent);

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  const onRollupButtonClick = () => {
    replaceEventToEdit();

    document.addEventListener(`keydown`, onFormEscPress);
  };

  const onFormSave = (evt) => {
    evt.preventDefault();

    replaceEditToEvent();

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  eventItemComponent.setRollupButtonClickHandler(onRollupButtonClick);
  eventEditComponent.setSubmitHandler(onFormSave);

  render(container, eventItemComponent);
};

export {renderEvent};
