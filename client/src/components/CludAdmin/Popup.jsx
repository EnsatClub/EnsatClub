import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect } from 'react';
import { acceptDemand, declineDemand } from '../../features/Clubs/ClubSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({ onClose, demand, member }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch()

  const handleAccept = () => {
    dispatch(acceptDemand({demand_id: demand.id}))
    toast.success('Demand accepted successfully');
  };

  const handleReject = () => {
    dispatch(declineDemand({demand_id: demand.id}))
    toast.error('Demand rejected');
    onClose()
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-20   ">
      <div ref={modalRef} className="p-4 border border-gray-300 shadow-md rounded-2xl h-[50%] bg-[#DEF2F1] w-3/6 flex flex-col justify-between">
        <div>
          <div className='flex justify-between mb-2'>
            <div></div>
            <button className="btn btn-sm btn-circle btn-ghost text-center text-lg" onClick={onClose}>✕</button>
          </div>
          <h2 className="text-center font-bold text-2xl">Details du demande</h2>
        </div>

        {/* Alert */}
        <div role="alert" className="alert alert-warning mb-4 flex items-center">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl" />
          <span className="ml-2">Cet email est externe</span>
        </div>

        {/* Information Details */}
        <div className="flex-grow overflow-auto">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:col-gap-6 xl:grid-cols-4">
            <div className="text-base font-medium text-gray-900">
              <dt>Nom complet :</dt>
              <dd className="mt-1 text-gray-500">{demand.name}</dd>
            </div>
            <div className="text-base font-medium text-gray-900">
              <dt>Email :</dt>
              <dd className="mt-1 text-gray-500 break-words">Yassine.idrissi1@etu.uae.ac.ma</dd>
            </div>
            <div className="text-base font-medium text-gray-900">
              <dt>Etablissement :</dt>
              <dd className="mt-1 text-gray-500 break-words">ENSAT</dd>
            </div>
            <div className="text-base font-medium text-gray-900">
              <dt>Telephone :</dt>
              <dd className="mt-1 text-gray-500 break-words">1234567890</dd>
            </div>
            <div className="text-base font-medium text-gray-900 col-start-1 col-end-3 mt-2">
              <dt>Motivation :</dt>
              <dd className="mt-1 text-gray-500 break-words">
                Je suis motivé
              </dd>
            </div>
          </dl>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-5 items-center justify-end">
          <button className="btn btn-error" onClick={handleReject}>Decline</button>
          <button className="btn btn-success" onClick={handleAccept}>Approuve</button>
        </div>

      </div>
      <ToastContainer theme="colored"/>
    </div>
  );
};

export default Popup;
