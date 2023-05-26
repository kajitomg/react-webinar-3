import {memo} from 'react';
import BasketTool from "../../components/basket-tool";
import LinkMain from "../../components/link-main";
import PropTypes from "prop-types";
import './style.css'
import useSelector from "../../store/use-selector";
import {capitalizeFirstLetter} from "../../utils";

function PageMenu(props) {

  const select = useSelector(state => ({
    language:state.language.words.words
  }));

  return (
    <div className={'PageMenu'}>
      <LinkMain to={'/main'} title={capitalizeFirstLetter(select.language.page.mainButton)}/>
      <BasketTool
        onOpen={props.openModalBasket}
        amount={props.amount}
        sum={props.sum}
      />
    </div>
  );
}

PageMenu.propTypes = {
  amount: PropTypes.number,
  sum: PropTypes.number,
  openModalBasket: PropTypes.func,
};

export default memo(PageMenu);
