import React, { useState } from 'react';
import HelloSection from './HelloSection/HelloSectionListing';
import BodySection from './BodySection/BodySectionListing';

const ListingAdmin = () => {
  const [selectedMenu, setSelectedMenu] = useState('Citas');

  return (
    <div className="body">
      <HelloSection selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <BodySection selectedMenu={selectedMenu} />
    </div>
  );
};

export default ListingAdmin;
