import {memo} from 'react';
import BasketTool from "../../components/basket-tool";
import LinkMain from "../../components/link-main";
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "../../utils";
import useLanguage from "../../store/hooks/use-language";
import './style.css'

function PageMenu(props) {
  const [words] = useLanguage()

  return (
    <div className={'PageMenu'}>
      <LinkMain to={'/main'} title={capitalizeFirstLetter(words.page.mainButton)}/>
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
