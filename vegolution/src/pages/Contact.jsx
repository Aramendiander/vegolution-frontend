import React from 'react'
import Layout from '../components/Layout'
import { BiMailSend,BiPhoneCall,BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout>
        <div className='row cantacts'>
          <div className='col-md-6'>
            <img src="/images/contacts.jpeg" alt="contacts" style={{ width: "100%" }} />
          </div>
          <div className='col-md-4'>
            <h1 className='bg-dark p-2 text-white text-center'>CONTÁCTENOS</h1>
            <p className='text-justify mt-2'>
              Cualquier consulta e información sobre nuestros productos, no dude en ponerse en contacto con nosotros, estaremos encantados de atenderle.
            </p>
            <p className='mt-3'>
              <BiMailSend /> : help@vegolution.com
            </p>
            <p className='mt-3'>
              <BiPhoneCall /> : +34 999 999 999
            </p>
            <p className='mt-3'>
              <BiSupport /> : 1000-0000-0000
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact