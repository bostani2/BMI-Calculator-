(() => {
  // State management
  const state = {
    unit: "metric",
    height: "",
    weight: "",
    bmi: null,
    bmiStatus: "",
    error: "",
  };

  // DOM Elements
  const metricButton = document.querySelector(".metric-button");
  const imperialButton = document.querySelector(".imperial-button");
  const heightInput = document.querySelector(".height-input");
  const weightInput = document.querySelector(".weight-input");
  const calculateButton = document.querySelector(".calculate-button");
  const bmiNumber = document.querySelector(".bmi-number");
  const bmiStatus = document.querySelector(".bmi-status");
  const scaleIndicator = document.querySelector(".scale-indicator");
  const heightUnitIndicator = heightInput.nextElementSibling;
  const weightUnitIndicator = weightInput.nextElementSibling;

  // Event Handlers
  function setUnit(newUnit) {
    state.unit = newUnit;
    state.height = "";
    state.weight = "";
    state.bmi = null;
    state.bmiStatus = "";
    state.error = "";
    updateUI();
  }

  function calculateBMI() {
    const height = parseFloat(state.height);
    const weight = parseFloat(state.weight);

    if (!height || !weight || height <= 0 || weight <= 0) {
      state.error = "لطفاً مقادیر معتبر قد و وزن را وارد کنید";
      return;
    }

    let bmi;
    if (state.unit === "metric") {
      bmi = weight / ((height / 100) * (height / 100));
    } else {
      bmi = (weight * 703) / (height * height);
    }

    state.bmi = Math.round(bmi * 10) / 10;

    if (state.bmi < 18.5) {
      state.bmiStatus = "کم‌وزن";
    } else if (state.bmi < 25) {
      state.bmiStatus = "طبیعی";
    } else if (state.bmi < 30) {
      state.bmiStatus = "اضافه‌وزن";
    } else {
      state.bmiStatus = "چاق";
    }

    updateUI();
  }

  // UI Updates
  function updateUI() {
    // Update unit buttons
    metricButton.setAttribute("aria-checked", state.unit === "metric");
    imperialButton.setAttribute("aria-checked", state.unit === "imperial");

    metricButton.style.backgroundColor =
      state.unit === "metric" ? "rgba(236, 72, 153, 1)" : "transparent";
    metricButton.style.color =
      state.unit === "metric"
        ? "rgba(255, 255, 255, 1)"
        : "rgba(75, 85, 99, 1)";

    imperialButton.style.backgroundColor =
      state.unit === "imperial" ? "rgba(236, 72, 153, 1)" : "transparent";
    imperialButton.style.color =
      state.unit === "imperial"
        ? "rgba(255, 255, 255, 1)"
        : "rgba(75, 85, 99, 1)";

    // Update input fields
    heightInput.value = state.height;
    weightInput.value = state.weight;

    // Update unit indicators based on selected unit
    if (state.unit === "metric") {
      heightUnitIndicator.textContent = "cm";
      weightUnitIndicator.textContent = "kg";
    } else {
      heightUnitIndicator.textContent = "in";
      weightUnitIndicator.textContent = "lb";
    }

    // Update BMI display
    bmiNumber.textContent = state.bmi ? state.bmi : "اطلاعات را وارد کنید";
    bmiStatus.textContent = state.bmiStatus || "محاسبه توده بدنی شما";

    // Update scale indicator
    if (state.bmi) {
      const percentage = Math.min((state.bmi / 40) * 100, 100);
      scaleIndicator.style.width = `${percentage}%`;

      // Set color based on BMI status
      if (state.bmiStatus === "کم‌وزن") {
        scaleIndicator.style.backgroundColor = "rgba(96, 165, 250, 1)";
      } else if (state.bmiStatus === "طبیعی") {
        scaleIndicator.style.backgroundColor = "rgba(34, 197, 94, 1)";
      } else if (state.bmiStatus === "اضافه‌وزن") {
        scaleIndicator.style.backgroundColor = "rgba(234, 179, 8, 1)";
      } else if (state.bmiStatus === "چاق") {
        scaleIndicator.style.backgroundColor = "rgba(239, 68, 68, 1)";
      }
    } else {
      scaleIndicator.style.width = "0%";
      scaleIndicator.style.backgroundColor = "rgba(229, 231, 235, 1)";
    }
  }

  // Event Listeners
  metricButton.addEventListener("click", () => setUnit("metric"));
  imperialButton.addEventListener("click", () => setUnit("imperial"));

  metricButton.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setUnit("metric");
    }
  });

  imperialButton.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setUnit("imperial");
    }
  });

  heightInput.addEventListener("input", (event) => {
    state.height = event.target.value;
  });

  weightInput.addEventListener("input", (event) => {
    state.weight = event.target.value;
  });

  calculateButton.addEventListener("click", calculateBMI);

  // Initialize UI
  updateUI();
})();
