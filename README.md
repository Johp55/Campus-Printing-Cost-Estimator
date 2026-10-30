# 🖨️ PrintWise
## Web-Based Campus Printing and Document Processing Cost Estimator

### Project Information

**Project Title:** Design and Development of a Web-Based Campus Printing and Document Processing Cost Estimator

**Application Name:** PrintWise

**Student Name:** David Ojogbane

**Matric Number:** 2025/HND/SWD/009

**Course Code:** SWD 417

**Project Type:** Web-Based Application

---

## 1. Project Description

PrintWise is a responsive web-based application designed to help
students estimate the cost of printing and document-processing
services within a campus environment.

The application provides an interactive calculator for estimating
expenses related to printing, photocopying, binding, lamination,
scanning, and document typing.

Users can enter document information, select printing options,
specify the quantity of services required, and receive an
instant cost breakdown.

The application also allows users to customize service prices,
save estimates, view previous calculations, and print
cost summaries.

PrintWise was developed using HTML, CSS, and JavaScript.

Browser Local Storage is used to save estimates and pricing
settings without requiring a backend database.

---

## 2. Problem Statement

Students frequently use campus printing and document-processing
services for assignments, projects, seminar papers, reports,
and other academic activities.

However, students may find it difficult to determine the total
cost of these services before visiting a printing shop.

The absence of a simple cost estimation tool can make
budgeting for academic printing expenses inconvenient.

PrintWise addresses this problem by providing a web-based
platform that calculates estimated document-processing costs
based on user-selected services and configurable rates.

---

## 3. Aim of the Project

The aim of this project is to design and develop a web-based
campus printing and document-processing cost estimator
that enables students to calculate estimated printing
expenses quickly and conveniently.

---

## 4. Objectives of the Project

The objectives are:

1. To design a responsive web-based printing cost estimator.
2. To develop an interactive printing cost calculator.
3. To calculate photocopying and document-processing expenses.
4. To allow users to customize service pricing.
5. To provide an automatic breakdown of estimated costs.
6. To enable users to save and retrieve previous estimates.
7. To provide functionality for printing cost summaries.
8. To develop a user-friendly interface accessible on
   computers and mobile devices.

---

## 5. Features of the Application

### Dashboard

The dashboard displays:

- Total saved estimates
- Current estimated cost
- Printing cost
- Document-processing cost

### Printing Cost Calculator

Users can calculate printing costs using:

- Number of pages
- Number of copies
- Printing type
- Paper size
- Printing mode

### Photocopying Calculator

Users can calculate photocopying expenses based on
the number of pages and copies required.

### Document Processing

The application supports cost estimation for:

- Spiral binding
- Thermal binding
- Lamination
- Document scanning
- Document typing

### Service Pricing

Users can customize the rates used for cost calculations.

### Estimate History

Users can:

- Save estimates
- View saved estimates
- Reload previous estimates
- Delete individual estimates
- Clear estimate history

### Print Estimate

Users can generate printable cost summaries using
the browser's print functionality.

### Dark Mode

Users can switch between light and dark themes.

### Responsive Design

The application supports desktop, tablet, and mobile screens.

---

## 6. Technologies Used

### HTML5

Used to create the structure and content of the application.

### CSS3

Used to style the interface, create responsive layouts,
and implement dark mode.

### JavaScript

Used for cost calculations, navigation, form processing,
estimate management, and interactive functionality.

### Local Storage

Used to save estimates, service pricing, and theme settings.

---

## 7. Project Folder Structure

Campus-Printing-Cost-Estimator/
|
|-- index.html
|
|-- css/
|   |-- style.css
|
|-- js/
|   |-- script.js
|
|-- README.md

---

## 8. System Requirements

The application requires:

- A modern web browser
- A computer, tablet, or smartphone
- JavaScript enabled in the browser

No PHP, MySQL, or backend server is required.

---

## 9. How to Run the Application

1. Download or clone the GitHub repository.
2. Extract the downloaded files if necessary.
3. Open the project folder.
4. Double-click index.html.

The application will open in a web browser.

Alternatively, open the project in Visual Studio Code
and run index.html using Live Server.

---

## 10. How to Use PrintWise

### Calculating Printing Costs

1. Open the application.
2. Navigate to Cost Calculator.
3. Enter the document name.
4. Enter the number of pages.
5. Enter the number of copies.
6. Select the printing type.
7. Select the paper size.
8. Select the printing mode.
9. View the automatically calculated cost.

### Adding Document Processing Services

1. Enter the number of photocopy pages.
2. Select a binding type if required.
3. Enter the number of bindings.
4. Enter the number of pages for lamination.
5. Enter the number of pages for scanning.
6. Enter the number of pages for typing.
7. View the updated total cost.

### Saving an Estimate

1. Complete the calculator form.
2. Click Save Estimate.
3. Open Estimate History.
4. View the saved estimate.

### Updating Service Prices

1. Navigate to Service Pricing.
2. Modify the required service rates.
3. Click Save Pricing.
4. Return to the calculator.

### Printing an Estimate

1. Enter the required services.
2. Click Print Estimate.
3. Use the browser's print dialog to print
   or save the estimate as a PDF.

---

## 11. Cost Calculation Formulas

Printing Cost =
Number of Pages × Number of Copies × Printing Rate

Photocopying Cost =
Number of Pages × Number of Copies × Photocopy Rate

Binding Cost =
Number of Bindings × Binding Rate

Lamination Cost =
Number of Pages × Lamination Rate

Scanning Cost =
Number of Pages × Scanning Rate

Typing Cost =
Number of Pages × Typing Rate

Grand Total =
Printing Cost + Photocopying Cost + Binding Cost
+ Lamination Cost + Scanning Cost + Typing Cost

For double-sided printing, a configurable multiplier
is applied to the printing cost.

---

## 12. Data Storage

PrintWise uses browser Local Storage.

The application stores information using these keys:

- printwise_estimates
- printwise_pricing
- printwise_theme

Saved information remains available after refreshing
the browser unless the browser's stored website data
is cleared.

---

## 13. Project Limitations

1. The application does not process actual printing orders.
2. It does not support online payment.
3. Users cannot upload documents for automatic page counting.
4. Saved estimates are stored locally in the browser.
5. The application does not synchronize data across devices.
6. Actual printing prices may differ from estimated prices.

---

## 14. Future Improvements

Future improvements may include:

- Document upload functionality
- Automatic PDF page counting
- Online printing requests
- User registration and login
- Cloud database integration
- Online payment integration
- Printing shop management
- Email notifications
- Downloadable PDF receipts

---

## 15. Developer Information

**Name:** David Ojogbane

**Matric Number:** 2025/HND/SWD/009

**Course Code:** SWD 417

**Project:** Design and Development of a Web-Based Campus
Printing and Document Processing Cost Estimator

---

## 16. Project Purpose

This application was developed for educational purposes
as part of the SWD 417 assignment.

The service prices included in the application are
demonstration values and should not be considered
official campus printing rates.

© 2026 PrintWise. All Rights Reserved.