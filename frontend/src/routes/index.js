import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import DeliveryEdit from '~/pages/DeliveryEdit';
import DeliveryAdd from '~/pages/DeliveryAdd';
import Deliveryman from '~/pages/Deliveryman';
import DeliverymanAdd from '~/pages/DeliverymanAdd';
import DeliverymanEdit from '~/pages/DeliverymanEdit';
import Recipients from '~/pages/Recipients';
import RecipientAdd from '~/pages/RecipientAdd';
import RecipientEdit from '~/pages/RecipientEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route
        path="/delivery/edit/:id"
        exact
        component={DeliveryEdit}
        isPrivate
      />
      <Route path="/delivery/add" exact component={DeliveryAdd} isPrivate />
      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/add"
        exact
        component={DeliverymanAdd}
        isPrivate
      />
      <Route
        path="/deliveryman/edit/:id"
        exact
        component={DeliverymanEdit}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipient/add" exact component={RecipientAdd} isPrivate />
      <Route
        path="/recipient/edit/:id"
        exact
        component={RecipientEdit}
        isPrivate
      />
    </Switch>
  );
}
