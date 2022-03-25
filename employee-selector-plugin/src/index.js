// Import React Libraries
import { useState, useEffect } from 'react';

// Import WP Libraries
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

// Import CSS
import './index.scss';

// Register Block
wp.blocks.registerBlockType('sccdomain/employeeselectorplugin', {
  title: 'Employee Selector Plugin',
  description: 'Sample Employee Selection Plugin',
  icon: 'businessman',
  category: 'common',
  attributes: {
    empId: { type: "string" }
  },
  edit: EditComponent,
  save: ( props ) => { return null }
});

// Admin Functionality
function EditComponent(props) {
  // Use State Hooks
  const [ preview, setPreview ] = useState('')

  // Use Effect Hooks
  useEffect(() => {
    if (props.attributes.empId) {
    // Asynchronous API Call
    async function run() {
      const response = await apiFetch({
        path: `/employeeSelector/v1/employeeMarkup?empId=${props.attributes.empId}`,
        method: 'GET'
      });

      setPreview(response);
    }
    run();
    }
  }, [props.attributes.empId]);

  // Get All Employees
  const employees = useSelect( select => {
    return select('core').getEntityRecords('postType', 'employee', { per_page: -1 });
  });

  // Queue Loading Screen
  if ( employees == undefined ) return <p>Loading...</p>
  
  // Return Markup for Admin Edit Screen
  return (
    <div className="featured-employee-wrapper">
      <div className="employee-select-container">
        <select onChange={ e => props.setAttributes({ empId: e.target.value }) }>
          <option value="">Select an Employee</option>
          { employees.map(( employee ) => {
            return (
              <option value={ employee.id } selected={ props.attributes.empId == employee.id }>
                {employee.title.rendered}
              </option>
            )
          }) }
        </select>
      </div> 
      
      <div dangerouslySetInnerHTML={{__html: preview}}></div>
    </div>
  )
}