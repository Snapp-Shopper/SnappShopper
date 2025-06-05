import React, { useState } from 'react'
import AddressCard from './AddressCard';
import { LuMapPin, LuPlus } from 'react-icons/lu';

const Addressbook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Joanne Felix',
      street: '20, Felicia Kaleosho street, Iganmu, Lagos, Nigeria',
      zipcode: '1023444',
      phone: '+234 708 934 3298',
      isDefault: true
    },
    {
      id: 2,
      name: 'Joanne Felix',
      street: '15, Victoria Island, Lagos, Nigeria',
      zipcode: '1023445',
      phone: '+234 708 934 3299',
      isDefault: false
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <LuMapPin className="w-5 h-5 mr-2 text-blue-600" />
          Address Book
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <LuPlus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>
      
      <div>
        {addresses.map((address) => (
          <AddressCard 
            key={address.id}
            address={address}
            isDefault={address.isDefault}
            onSetDefault={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Addressbook