import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";
import $ from 'ng_client/node_modules/jquery/dist/jquery.min.js'
import { Options } from "ng_client/component/interface/instanceInterface";

interface SearchSelectInterface {
  icon: string,
  label: string,
  multiple: boolean,
  options: Options[],
  setValue: React.Dispatch<React.SetStateAction<string[]>>,
  value: string[],
}

const SearchSelect = ({ icon, label, multiple, options, setValue, value }: SearchSelectInterface) => {

  const [isFocus, setIsFocus] = React.useState(false)
  const [firstFocus, setFirstFocus] = React.useState(false)
  const rolesRef = React.useRef(value);
  const firstFocusRef = React.useRef(firstFocus);


  React.useEffect(() => {
    rolesRef.current = value;
    firstFocusRef.current = firstFocus
  }, [value, firstFocus]);


  React.useEffect(() => {
    $('.js-example-basic-multiple').select2({
      placeholder: i18next.t(label),
    });

    $('.js-example-basic-multiple').on('change', function (event) {
      const selectedOptions = $(this).val();
      rolesRef.current = selectedOptions;
      setValue(selectedOptions);
    });

    const openSelect = () => {
      $('.select2-search__field').attr('placeholder', '');
      setIsFocus(true);
      if (!firstFocus) {
        setFirstFocus(true)
      }
    };

    const closeSelect = () => {
      console.log('close')
      if (rolesRef.current.length === 0) {
        $('.select2-search__field').attr(
          'placeholder',
          i18next.t(label)
        );
      }
      console.log(firstFocusRef, rolesRef)
      if (firstFocusRef.current && rolesRef.current.length === 0) {
        $('.select2-search__field').addClass('danger-input');
        $('.select2-selection').addClass('danger-input');
      }
      else {
        $('.select2-search__field').removeClass('danger-input');
        $('.select2-selection').removeClass('danger-input');
      }
      setIsFocus(false);
    };

    if(value.length === 0){
      setIsFocus(false)
    }

    $('.js-example-basic-multiple').on('select2:open', openSelect);
    $('.js-example-basic-multiple').on('select2:close', closeSelect);

    return () => {
      $('.js-example-basic-multiple').off('select2:open', openSelect);
      $('.js-example-basic-multiple').off('select2:close', closeSelect);
    };
  }, [value]);

console.log(value)
console.log(isFocus)


  return (
    <div className="row pb-2 pr-0">
      <div className="col-auto d-flex align-items-center pt-3" style={{ paddingRight: '0px' }}>
        <i className={`${icon} icon-large`}></i>
      </div>
      <div className="col">
        <label style={{ color: (firstFocusRef.current && rolesRef.current.length === 0) ? 'rgb(221,44,0)' : 'rgba(0,0,0,0.54)' }}>
          {isFocus || value.length > 0 ? i18next.t(label) : ''}
        </label>
        <div>
          <select className="js-example-basic-multiple" multiple={multiple} value={value.length > 0 ? value : undefined}>
            {options && options.map(option => (
              <option value={option.value} className="selectOption" key={option.value}>
                {i18next.t(option.translation)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchSelect