import React,{memo} from 'react';
import PropTypes from 'prop-types';
import ItemPagination from "../item-pagination";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function Pagination (props){
  const cn = bem('Pagination')

  return (
    <div className={cn()}>
      {props.pages.map((page) =>
        page.value !== null &&
        <ItemPagination
          title={page.value}
          active={page.value===props.page}
          onClick={props.onClick}
          key={page.name}
        /> ||
        page.value === null && <span className={cn('dots')} key={page.name}>...</span>
      )}
    </div>
  );
}

Pagination.propTypes = {
  page:PropTypes.number,
  pages:PropTypes.array,
  onClick:PropTypes.func
};

Pagination.defaultProps = {
  page:1,
  pages: {},
  onClick:() => {}
}

export default memo(Pagination);