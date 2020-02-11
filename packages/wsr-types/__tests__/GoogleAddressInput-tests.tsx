import * as React from 'react';
import GoogleAddressInput from 'wix-style-react/GoogleAddressInput';
import clients from 'wix-style-react/clients';

function GoogleAddressInputWithMandatoryProps() {
  return <GoogleAddressInput />;
}
function GoogleAddressInputWithAllProps() {
  return (
    <GoogleAddressInput
      placeholder={'placeholder'}
      valuePrefix={'valuePrefix'}
      countryCode={'countryCode'}
      value={'value'}
      types={['type1','type2']}
      filterTypes={['filterType1']}
      placeDetailsFields={['place1', 'place2']}
      error={true}
      onChange={e=>{}}
      onBlur={e=>{}}
      onFocus={e=>{}}
      onKeyDown={e=>{}}
      onSet={()=>{}}
      Client={clients.GoogleMapsClient}
      magnifyingGlass
      theme={'paneltitle'}
      readOnly
      autoSelect
      footer={'footer'}
      footerOptions={{}}
      clearSuggestionsOnBlur
      fallbackToManual
      poweredByGoogle
      handler='geocode'
    />
  );
}
