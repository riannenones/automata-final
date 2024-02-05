document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const resultElement = document.getElementById("result");
  const signupButton = document.getElementById("signupButton");
  

  function togglePassword() {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    checkPasswordStrength();
  }

  let abSml = new AutomataBuilder_small();
  let dfaSml = new DFA(
    abSml.alphabet,
    abSml.states[0],
    abSml.states[0],
    abSml.transitions,
    abSml.states
  );

  let abCap = new AutomataBuilder_capital();
  let dfaCap = new DFA(
    abCap.alphabet,
    abCap.states[0],
    abCap.states[0],
    abCap.transitions,
    abCap.states
  );

  let abDig = new AutomataBuilder_digits();
  let dfaDig = new DFA(
    abDig.alphabet,
    abDig.states[0],
    abDig.states[0],
    abDig.transitions,
    abDig.states
  );

  let abChar = new AutomataBuilder_character();
  let dfaChar = new DFA(
    abChar.alphabet,
    abChar.states[0],
    abChar.states[0],
    abChar.transitions,
    abChar.states
  );

  let abLen = new AutomataBuilder_length();
  let dfaLen = new DFA(
    abLen.alphabet,
    abLen.states[0],
    abLen.states[0],
    abLen.transitions,
    abLen.states
  );

  function checkPasswordStrength() {
    const errors = [];
    const password = passwordInput.value;
    const validationResult1 = dfaSml.validatePass(password);
    const validationResult2 = dfaCap.validatePass(password);
    const validationResult3 = dfaDig.validatePass(password);
    const validationResult4 = dfaChar.validatePass(password);
    const validationResult5 = dfaLen.validatePass(password);
    

    if (validationResult1.isValid && validationResult2.isValid && validationResult3.isValid && validationResult4.isValid && validationResult5.isValid) {
      resultElement.classList.remove("invalid");
      resultElement.classList.add("valid");
      resultElement.textContent = "Strong Password";
      updateSignupButtonState()
    } else {
      if (!validationResult1.isValid) {
        errors.push("Password must contain at least one lowercase letter.");
      }
      if (!validationResult2.isValid) {
        errors.push("Password must contain at least one uppercase letter.");
      }
      if (!validationResult3.isValid) {
        errors.push("Password must contain at least one digit.");
      }
      if (!validationResult4.isValid) {
        errors.push("Password must contain at least one special character.");
      }
      if (!validationResult5.isValid) {
        errors.push("Password must be at least 8 characters long.");
      }

      resultElement.classList.remove("valid");
      resultElement.classList.add("invalid");
      resultElement.innerHTML = errors.join("<br>");
    }
    if (password.length === 0) {
      resultElement.style.color = "";
      resultElement.textContent = "";
      resultElement.classList.remove("invalid", "valid");
    }

  }

  function updateSignupButtonState() {
    const isEmailValid = resultElement.classList.contains("valid");
    const isPasswordValid = resultElement.classList.contains("valid");
  
    signupButton.disabled = !(isEmailValid && isPasswordValid);

    const password = document.getElementById("passwordInput").value;
    const email = document.getElementById("emailInput").value;

    if (email.length === 0 && password.length === 0) {
      signupButton.disabled = (isEmailValid && isPasswordValid);
    }
  }


  passwordInput.addEventListener("input", checkPasswordStrength);
  document
    .querySelector(".show-password-checkbox")
    .addEventListener("change", togglePassword);
});


