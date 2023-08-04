import React from "react";
import CategorieName from 'ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategorieName/CategorieName';
import CategoryDraggable from 'ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategoryDraggable/CategoryDraggable';
import { Categorie, Model } from "ng_client/component/interface/instanceInterface";

interface DisplayCategoriesInterface{
  categ : Categorie[],
  model : Model,
  updateCategories(id : number) : void
}

const DisplayCategories = ({categ, model, updateCategories} : DisplayCategoriesInterface) => {
  return categ && categ.map(categorie => (
    <div key={categorie.id}>
      <CategorieName
        updateCategories={updateCategories}
        isShow={categorie.isShow}
        label={categorie[`label${model.language}`]}
        categId={categorie.id}
      />
      {categorie.isShow && categorie.objects && categorie.objects.map(object => (
        <CategoryDraggable
          object={object}
          key={object.uuid}
          model={model}
        />
      ))}
      {categorie.isShow && (
        <div className="ps-4">
          <DisplayCategories
            categ={categorie.child}
            model={model}
            updateCategories={updateCategories}
          />
        </div>
      )}
    </div>
  ));
};

export default DisplayCategories;