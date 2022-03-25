<?php
/*
  Plugin Name: Insert Quick Question
  Version: 1.0.0
  Description: Provide multiple-choice answers to custom questions on any page. Great for one-question surveys and checking reader retention.
  Author: Steven Clements
  Author URI: http://github.com/developclementine
*/

if (!defined('ABSPATH')) exit;

class ScInsertQuickQuestion
{
  function __construct()
  {
    add_action('init', array($this, 'admin_assets'));
  }

  function admin_assets()
  {
    wp_register_style('insertQStyle', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('insertQQuestion', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'));
    register_block_type('sccdomain/quickquestionplugin', array(
      'editor_style' => 'insertQStyle',
      'editor_script' => 'insertQQuestion',
      'render_callback' => array($this, 'markup')
    ));
  }

  function markup($attributes)
  {
    if (!is_admin()) {
      wp_enqueue_script('publicQQuestion', plugin_dir_url(__FILE__) . 'build/public.js', array('wp-element'));
      wp_enqueue_style('publicQStyle', plugin_dir_url(__FILE__) . 'build/public.css');
    }

    ob_start(); ?>
    <div class="questionOutput">
      <pre style="display: none;"><?php echo wp_json_encode($attributes); ?></pre>
    </div>
<?php return ob_get_clean();
  }
}

$scInsertQuickQuestion = new ScInsertQuickQuestion();
