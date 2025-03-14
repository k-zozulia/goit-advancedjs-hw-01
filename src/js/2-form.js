const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`❌ Error saving to Local Storage:`, error);
  }
};

const loadFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (error) {
    console.error(`❌ Error loading from Local Storage:`, error);
    return {};
  }
};

let formState = loadFromStorage(STORAGE_KEY);

const populateFormFields = () => {
  feedbackForm.elements.email.value = formState.email || '';
  feedbackForm.elements.message.value = formState.message || '';
};

populateFormFields();

feedbackForm.addEventListener('input', ({ target: { name, value } }) => {
  formState[name] = value.trim();
  saveToStorage(STORAGE_KEY, formState);
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const { email, message } = formState;

  if (!email || !message) {
    alert('⚠️ Please fill in all fields.');
    return;
  }

  console.log('✅ Form Submitted:', formState);

  feedbackForm.reset();
  localStorage.removeItem(STORAGE_KEY);
  formState = {};
});