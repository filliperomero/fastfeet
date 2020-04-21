import React from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import { PopupButton } from './styles';

export default function MoreOptionsPopup({ children, ...rest }) {
  return (
    <Popup
      trigger={
        <PopupButton>
          <MdMoreHoriz size={28} color="#c6c6c6" />
        </PopupButton>
      }
      position="bottom center"
      contentStyle={{
        width: '150px',
        borderRadius: '4px',
        boxShadow: '0 0 2px rgba(0, 0, 0, .15)',
        border: 0,
      }}
      arrowStyle={{
        boxShadow: '0.5px 0.5px 0px rgba(0, 0, 0, .15)',
      }}
      {...rest}
    >
      {children}
    </Popup>
  );
}

MoreOptionsPopup.propTypes = {
  children: PropTypes.element.isRequired,
};
