import {languages} from "../../language";
import StoreModule from "../module";

export const languageTypes = {
  english:'eng',
  russian:'ru'
}

class Language extends StoreModule{

  initState(){
    return{
      language:languageTypes.russian,
      words:languages.get(languageTypes.russian)
    }
  }

  /**
   * Установка языка сайта
   * @param language{String} Устанавливаемый язык
   */
  setLanguage(language){
    return this.setState(
      {
        ...this.getState(),
        language:language,
        words:languages.get(language)
      }
    )
  }
}

export default Language