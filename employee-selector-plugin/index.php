<?php
/*
  Plugin Name: Employee Selector Plugin
  Version: 1.0.0
  Description: Sample Employee Selector Plugin
  Author: Steven Clements
  Author URI: http://github.com/developclementine
*/

// Exit Plugin if Accessed Directly by URL
if (!defined('ABSPATH')) exit;

// Include Dependent Files
require_once plugin_dir_path(__FILE__) . 'inc/writeMarkup.php';

// Object Oriented
class ScEmployeeSelector
{
  function __construct()
  {
    // Load Dependent CSS & JavaScript Files
    add_action('init', array($this, 'admin_assets'));

    // Initialize REST API
    add_action('rest_api_init', [$this, 'employee_markup']);
  }

  // Register Resources Used in the Admin View
  function admin_assets()
  {
    // CSS Stylesheets
    wp_register_style('empSelectStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    // JavaScript Files
    wp_register_script('empSelectScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks'));

    // WP Block
    register_block_type('sccdomain/employeeselectorplugin', array(
      'editor_style' => 'empSelectStyle',
      'editor_script' => 'empSelectScript',
      'render_callback' => array($this, 'renderCallback')
    ));
  }

  // Get Employee Data from API
  function employee_markup()
  {
    // Register API Routes
    register_rest_route('employeeSelector/v1', 'employeeMarkup', array(
      'methods' => 'GET',
      'callback' => array($this, 'retrieve_markup')
    ));
  }

  // Retrieve Generated Markup
  function retrieve_markup($data)
  {
    return write_markup($data['empId']);
  }

  // Render Callback to use PHP for Dynamic Editing
  function renderCallback($attributes)
  {
    // Check that an Employee is Selected
    if ($attributes['empId']) {
      // Register CSS Stylesheets
      wp_enqueue_style('empSelectStyle', plugin_dir_url(__FILE__) . 'build/index.css');
      // Generate Markup for Employee
      return write_markup($attributes['empId']);
    } else {
      return null;
    }
  }
}

// Instantiate a New Instance of the Block
$scEmployeeSelector = new ScEmployeeSelector();
