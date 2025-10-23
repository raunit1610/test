    function saveStudent() {
      // Retrieve student data from localStorage
      const studentDataString = localStorage.getItem("studentData");
      if (studentDataString) {
        const student = JSON.parse(studentDataString);

        // Display data to Report.html spans with matching IDs
        const semesterSpan = document.getElementById("semester");
        if (semesterSpan) semesterSpan.textContent = student.semester || '';

        const stnSpan = document.getElementById("stn");
        if (stnSpan) stnSpan.textContent = student.stn || ''; 

        const stidSpan = document.getElementById("stid");
        if (stidSpan) stidSpan.textContent = student.stid || ''; 

        const fnSpan = document.getElementById("fn");
        if (fnSpan) fnSpan.textContent = student.fn || ''; 

        const mnameSpan = document.getElementById("mname");
        if (mnameSpan) mnameSpan.textContent = student.mname || '';

        const stclassSpan = document.getElementById("stclass");
        if (stclassSpan) stclassSpan.textContent = student.stclass || '';

        const stsecSpan = document.getElementById("stsec");
        if (stsecSpan) stsecSpan.textContent = student.stsec || '';

        const rnSpan = document.getElementById("rn");
        if (rnSpan) rnSpan.textContent = student.rn || '';

        const yearSpan = document.getElementById("year");
        if (yearSpan) yearSpan.textContent = student.year || '';
      }
    }

    function saveGrades() {
      // Retrieve grades data from localStorage
      const gradesDataString = localStorage.getItem("gradesData");
      if (gradesDataString) {
        const gradesData = JSON.parse(gradesDataString);

        // Clear existing content in case of previous data or multiple loads
        for (let i = 1; i <= 11; i++) {
            const displaySubjectSpan = document.getElementById("sub" + i);
            const displayGradeSpan = document.getElementById("gd" + i);
            if (displaySubjectSpan) displaySubjectSpan.textContent = "";
            if (displayGradeSpan) displayGradeSpan.textContent = "";
        }

        // Populate display spans with loaded data
        // gradesData is an object with keys like 'sub1', 'gd1', 'sub2', 'gd2', etc.
        for (let i = 1; i <= 11; i++) {
          const displaySubjectSpan = document.getElementById("sub" + i);
          const displayGradeSpan = document.getElementById("gd" + i);

          if (displaySubjectSpan) {
            displaySubjectSpan.textContent = gradesData[`sub${i}`] || '';
          }
          if (displayGradeSpan) {
            displayGradeSpan.textContent = gradesData[`gd${i}`] || '';
          }
        }
      }
    }

    function saveHealth() {
      // Retrieve health data from localStorage
      const healthDataString = localStorage.getItem("healthData");
      if (healthDataString) {
        const healthData = JSON.parse(healthDataString);

        // Display data to Report.html spans with matching IDs
        const dateSpan = document.getElementById("date");
        if (dateSpan) dateSpan.textContent = healthData.date || '';

        const ageSpan = document.getElementById("age");
        if (ageSpan) ageSpan.textContent = healthData.age || '';

        const heightSpan = document.getElementById("height");
        if (heightSpan) heightSpan.textContent = healthData.height || '';

        const weightSpan = document.getElementById("weight");
        if (weightSpan) weightSpan.textContent = healthData.weight || '';

        // Handle additional health-related data that are rendered as placeholders in Report.html
        // Assuming the entire report content is within an element with id="report"
        const reportElement = document.getElementById('report');
        if (reportElement) {
          let reportHtml = reportElement.innerHTML;

          // Replace placeholders with data from localStorage
          reportHtml = reportHtml.replace('{{medical_comment}}', healthData.moc || '');
          reportHtml = reportHtml.replace('_____________________', healthData.mos || '_____________________');
          reportHtml = reportHtml.replace('{{attendance}}', healthData.att || '');
          reportHtml = reportHtml.replace('{{teacher_remark}}', healthData.ctr || '');
          reportHtml = reportHtml.replace('{{result_date}}', healthData.orp || '');
          reportHtml = reportHtml.replace('{{rector_name}}', healthData.recn || '');
          reportHtml = reportHtml.replace('{{class_teacher_name}}', healthData.clt || '');
          reportHtml = reportHtml.replace('{{headmaster_name}}', healthData.pr || '');
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
          const day = String(today.getDate()).padStart(2, '0');
          const formattedReportDate = `${year}-${month}-${day}`;
          reportHtml = reportHtml.replace('{{report_date}}', formattedReportDate);

          // Update the report element's innerHTML with the replaced values
          reportElement.innerHTML = reportHtml;
        }
      }
    }

    function saveQualities() {
      // Retrieve qualities data from localStorage
      const qualitiesDataString = localStorage.getItem("qualitiesData");
      if (qualitiesDataString) {
        const record = JSON.parse(qualitiesDataString);

        // Display data to Report.html spans with matching IDs
        const emotionalSpan = document.getElementById("emotional");
        if (emotionalSpan) emotionalSpan.textContent = record.Emotional_Development || '';

        const intellectualSpan = document.getElementById("intellectual");
        if (intellectualSpan) intellectualSpan.textContent = record.Intellectual_Development || '';

        const languageSpan = document.getElementById("language");
        if (languageSpan) languageSpan.textContent = record.Language_Development || '';

        const physicalSpan = document.getElementById("physical");
        if (physicalSpan) physicalSpan.textContent = record.Physical_Development || '';

        const socialSpan = document.getElementById("social");
        if (socialSpan) socialSpan.textContent = record.Social_Development || '';
      }
    }

    // This block ensures functions are called in the correct context based on the page title.
    if (document.title === "Subject & Grade Form") { // This block runs when index.js is loaded in index.html
        document.addEventListener('DOMContentLoaded', () => {
            const submitButton = document.getElementById('submit');
            if (submitButton) {
                submitButton.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default form submission

                    // 1. Collect Student Information from index.html form inputs
                    const studentData = {
                        semester: document.getElementById('semester').value,
                        stn: document.getElementById('stn').value,
                        stid: document.getElementById('stid').value,
                        stclass: document.getElementById('stclass').value, // Map stclass to class
                        stsec: document.getElementById('stsec').value, // Map stsec to section
                        fn: document.getElementById('fn').value,
                        mname: document.getElementById('mname').value,
                        rn: document.getElementById('rn').value, // Map rn to roll_no
                        year: document.getElementById('year').value // Map year to year_session
                    };
                    localStorage.setItem("studentData", JSON.stringify(studentData));

                    // 2. Collect Subject Grades from index.html form inputs
                    const gradesData = {};
                    for (let i = 1; i <= 11; i++) { // Loop up to 11 subjects as per Report.html structure
                        const subElement = document.getElementById(`sub${i}`);
                        const gdElement = document.getElementById(`gd${i}`);
                        if (subElement && gdElement) {
                            gradesData[`sub${i}`] = subElement.value;
                            gradesData[`gd${i}`] = gdElement.value;
                        }
                    }
                    localStorage.setItem("gradesData", JSON.stringify(gradesData));

                    // 3. Collect Health Status from index.html form inputs
                    // Assuming inputs for date, age, height, weight exist in index.html
                    const healthData = {
                        date: document.getElementById('date') ? document.getElementById('date').value : '',
                        age: document.getElementById('age') ? document.getElementById('age').value : '',
                        height: document.getElementById('height') ? document.getElementById('height').value : '',
                        weight: document.getElementById('weight') ? document.getElementById('weight').value : '',
                        moc: document.getElementById('moc') ? document.getElementById('moc').value : '',
                        mos: document.getElementById('mos') ? document.getElementById('mos').value : '',
                        att: document.getElementById('att') ? document.getElementById('att').value : '',
                        ctr: document.getElementById('ctr') ? document.getElementById('ctr').value : '',
                        orp: document.getElementById('orp') ? document.getElementById('orp').value : '',
                        recn: document.getElementById('recn') ? document.getElementById('recn').value : '',
                        clt: document.getElementById('clt') ? document.getElementById('clt').value : '',
                        pr: document.getElementById('pr') ? document.getElementById('pr').value : '',
                        // medical_comment and attendance are placeholders in Report.html, not typically direct inputs here
                    };
                    localStorage.setItem("healthData", JSON.stringify(healthData));

                    // 4. Collect Personal Qualities & Attitude Grade from index.html form inputs
                    // Assuming inputs for these exist in index.html
                    const qualitiesData = {
                        Emotional_Development: document.getElementById('emotional') ? document.getElementById('emotional').value : '',
                        Intellectual_Development: document.getElementById('intellectual') ? document.getElementById('intellectual').value : '',
                        Language_Development: document.getElementById('language') ? document.getElementById('language').value : '',
                        Physical_Development: document.getElementById('physical') ? document.getElementById('physical').value : '',
                        Social_Development: document.getElementById('social') ? document.getElementById('social').value : ''
                    };
                    localStorage.setItem("qualitiesData", JSON.stringify(qualitiesData));

                    // Redirect to Report.html after saving data
                    // Construct the path to Report.html relative to the current directory
                    const currentPath = window.location.pathname;
                    const currentDirectory = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                    window.location.href = window.location.origin + currentDirectory + 'Report.html';
                });
            }
        });
    } else if (document.title === "1st Semester Evaluation Report") { // This block runs when index.js is loaded in Report.html
        // Call the functions to load and display data when the script runs (i.e., when Report.html loads).
        saveStudent();
        saveGrades();
        saveHealth();
        saveQualities();
    }