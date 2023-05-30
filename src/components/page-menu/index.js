import {memo} from 'react';
import BasketTool from "../../components/basket-tool";
import LinkMain from "../../components/link-main";
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "../../utils";
import './style.css'
import {languageTypes} from "../../store/language";

function PageMenu(props) {

  return (
    <div className={'PageMenu'}>
      <LinkMain to={'/main'} title={capitalizeFirstLetter(props.words.page.mainButton)}/>
      <BasketTool
        onOpen={props.openModalBasket}
        amount={props.amount}
        sum={props.sum}
        words={props.words}
        language={props.language}
      />
    </div>
  );
}

PageMenu.propTypes = {
  amount: PropTypes.number,
  sum: PropTypes.number,
  openModalBasket: PropTypes.func,
  words:PropTypes.object.isRequired,
  language:PropTypes.string
};

PageMenu.defaultProps = {
  openModalBasket: () => {},
  sum: 0,
  amount: 0,
  language:languageTypes.russian
};

export default memo(PageMenu);
