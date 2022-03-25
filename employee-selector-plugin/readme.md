# Employee Selector Plugin

- Version: 1.0.0
- Project Type: WordPress Plugin
- Author: Steven Clements
- Description: Test code for Inpsyde assessment & application.

## Summary

This application leverages a PHP callback to return HTML for dynamic editing and uses React components and JSX. Minimal dependencies include React for UseState and UseEffect hooks and WordPress libraries, specifically @wordpress/api-fetch for making calls to the WordPress API.

Default behavior on editor screen is to have no default employee. Once selected a modal is displayed that shows the details of the employee including links to their social media accounts.

## Getting Started

1. Click on the Plugins link from the WordPress editor screen to open a list of all plugins on your site.
2. Be sure to activate the Employee Selector Plugin.
3. Navigate to a post or page where you wish to implement.
4. Search for Employee Selector in the Add Block screen and select it to add it to the page.
5. Update the post to share the dynamic data with site visitors. It will update automatically as needed.

## Public View

The public view is very similar to the editor screen view once an employee has been selected with the exception of the social media links being flexed. This view displays an employee profile including their name, position, description, thumbnail image, and social media links for GitHub, LinkedIn, Xing, and Facebook.
