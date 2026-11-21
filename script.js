let gradesArray = [];

      const ctx = document.querySelector(".chart-grades");

      const gradeChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: gradesArray.map((subject) => subject.subject),

          datasets: [
            {
              label: "Subject Grades",
              data: gradesArray.map((grade) => grade.grade),

              backgroundColor: gradesArray.map((subject) => {
                if (subject.grade >= 95 && subject.grade <= 100) {
                  return "rgb(241, 207, 52)";
                } else if (subject.grade >= 90 && subject.grade < 95) {
                  return "rgb(156, 52, 241)";
                } else if (subject.grade >= 85 && subject.grade < 90) {
                  return "rgb(55, 52, 241)";
                } else if (subject.grade >= 80 && subject.grade < 85) {
                  return "rgb(52, 241, 109)";
                } else if (subject.grade < 80) {
                  return rgb(241, 52, 52);
                }
              }),
              borderWidth: 1,
              borderRadius: 5,
              maxBarThickness: 70,
            },
          ],
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });

      renderGrades();

      function addGrades() {
        const subjectElement = document.querySelector(".subject-input");
        const subject = subjectElement.value;
        const gradeElement = document.querySelector(".grade-input");
        const grade = gradeElement.value;

        if (subject && grade) {
          gradesArray.push({
            subject,
            grade,
          });
          renderGrades();
          updateChart();
        } else if (!subject || !grade) {
          alert("Error: please enter a value::");
        }

        gradeElement.value = "";
        subjectElement.value = "";
      }

      function renderGrades() {
        let gradesHTML = [];
        for (i = 0; i < gradesArray.length; i++) {
          const gradeObject = gradesArray[i];
          const { subject } = gradeObject;
          const { grade } = gradeObject;

          const HTML = `
          <div class="grades-list">
              <p>${subject}</p>
              <p>${grade}</p>
              <button class="rmv-btn" onclick="
                gradesArray.splice(${i}, 1);
                renderGrades();
                updateChart();
              ">Remove</button>
              </div>
            `;
          gradesHTML += HTML;
        }

        document.querySelector(".html-grades").innerHTML = gradesHTML;
      }
      let calculation = 0;
      function calculateAver() {
        let total = 0;
        let num = 0;
        for (i = 0; i < gradesArray.length; i++) {
          const { grade } = gradesArray[i];
          total += Number(grade) * 100;
          num++;
        }
        calculation = Math.ceil(total / num) / 100;
        renderAver();
      }

      let tier = document.querySelector(".class-tier");
      let grade = document.querySelector(".grade-display");
      let performance = document.querySelector(".performance");
      let progress = document.querySelector(".progress");
      let bar = document.querySelector(".bar-progress");

      function renderAver() {
        if (calculation >= 95) {
          removeClass("a", "b", "c", "d");
          academicRank("S", "s", "Outstanding Performance");
        } else if (calculation >= 90 && calculation < 95) {
          removeClass("s", "b", "c", "d");
          academicRank("A", "a", "Excellent Performance");
        } else if (calculation >= 85 && calculation < 90) {
          removeClass("a", "s", "c", "d");
          academicRank("B", "b", "Very Good Performance");
        } else if (calculation >= 80 && calculation < 85) {
          removeClass("a", "b", "s", "d");
          academicRank("C", "c", "Good Performance");
        } else if (calculation < 80) {
          removeClass("a", "b", "c", "s");
          academicRank("D", "d", "Needs Improvement");
        }
      }
      function academicRank(classtier, variable, perf) {
        tier.classList.add(`${variable}-tier`);
        tier.innerHTML = `${classtier} Tier`;
        grade.innerHTML = calculation;
        grade.classList.add("grade-color");
        performance.innerHTML = `${perf}`;
        bar.style.width = `${calculation}%`;
        bar.classList.add(`${variable}-bg-tier`);
        progress.innerHTML = `${calculation}/100`;
      }
      function removeClass(tier1, tier2, tier3, tier4) {
        tier.classList.remove(
          `${tier1}-tier`,
          `${tier2}-tier`,
          `${tier3}-tier`,
          `${tier4}-tier`,
        );
        bar.classList.remove(
          `${tier1}-bg-tier`,
          `${tier2}-bg-tier`,
          `${tier3}-bg-tier`,
          `${tier4}-bg-tier`,
        );
      }
      function updateChart() {
        gradeChart.data.labels = gradesArray.map((subject) => subject.subject);

        gradeChart.data.datasets[0].data = gradesArray.map(
          (grade) => grade.grade,
        );

        gradeChart.data.datasets[0].backgroundColor = gradesArray.map(
          (subject) => {
            if (subject.grade >= 95 && subject.grade <= 100) {
              return "rgb(241, 207, 52)";
            } else if (subject.grade >= 90 && subject.grade < 95) {
              return "rgb(156, 52, 241)";
            } else if (subject.grade >= 85 && subject.grade < 90) {
              return "rgb(55, 52, 241)";
            } else if (subject.grade >= 80 && subject.grade < 85) {
              return "rgb(52, 241, 109)";
            } else if (subject.grade < 80) {
              return "rgb(241, 52, 52)";
            }
          },
        );

        gradeChart.update();
      }

      function enterKey(event) {
        if (event.key === "Enter") {
          addGrades();
        }
      }