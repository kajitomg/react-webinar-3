import {compose,composeU} from "@bem-react/core";
import withSizeS from "./_size/s";
import withSizeM from "./_size/m";
import withSizeL from "./_size/l";
import withWeightRegular from "./_weigth/regular";
import withWeightBold from "./_weigth/bold";


import { Text as TextCommon } from "./text"

export const Text = compose(
    composeU(
      withWeightRegular,
      withWeightBold
    ),
    composeU(
      withSizeS,
      withSizeM,
      withSizeL
    )
)(TextCommon)