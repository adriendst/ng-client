const DisplayCategories = (props) => {
    return props.categ && props.categ.map(categorie => {
      return React.createElement('div', { key: categorie.id },
        React.createElement(CategorieName, { updateCategories: props.updateCategories, isShow: categorie.isShow, label: categorie[`label${props.model.language}`], categId: categorie.id }),
        categorie.isShow && categorie.objects && categorie.objects.map(object => {
          return React.createElement(CategoryDraggable, { object: object, key: object.uuid, model : props.model })
        }),
        categorie.isShow && React.createElement('div', { className: 'ps-4' },
          React.createElement(DisplayCategories, { categ: categorie.child, model : props.model, updateCategories : props.updateCategories })
        ),
      )
    })
  }

  exports.DisplayCategories = DisplayCategories