import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Portal from "../portal";
import Head from "../head";
import {StoreContext} from "../../context";
import {cn as bem} from "@bem-react/classname"
import './style.css'

const cn = bem('Popup')

function Popup(props){
  const {cart} = useContext(StoreContext);

  const callbacks = {
    onClosePopup: (e) => {
      e.stopPropagation();
      props.onClose()
    }
  }

  if(!props.isOpened){
    return null;
  }
  return (
    <Portal>
      <div className={cn()}>
        <div
          className={cn('overlay')}
          onClick={callbacks.onClosePopup}
        />
        <div className={cn('content')}>
          <Head title={props.title}>
            <button
              className={cn('button')}
              onClick={callbacks.onClosePopup}
            >Закрыть</button>
          </Head>
          <div className={cn('children',{flexstart:cart.info.quantity >= 4})}>
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

Popup.propTypes = {
  title:PropTypes.node.isRequired,
  isOpened:PropTypes.bool,
  children: PropTypes.node,
  onClose:PropTypes.func
};
Popup.defaultProps = {
  isOpened:false,
  onClose:() => {}
}

export default React.memo(Popup);