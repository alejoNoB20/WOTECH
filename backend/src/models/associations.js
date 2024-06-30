import { Productions } from "./productsModels.js";
import { Stock } from "./stocksModels.js";

Stock.belongsToMany(Productions, {through: 'stocks_productions'});
Productions.belongsToMany(Stock, {through: 'stocks_productions'});

