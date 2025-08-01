document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  const confirmation = document.getElementById('confirmationMessage');

  const applicants = JSON.parse(localStorage.getItem('applicants')) || [];

  form.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const dragon = document.getElementById('dragon').value;

    if (age < 10) {
      confirmation.innerHTML = `<p>Sorry ${name}, you must be at least 10 to apply.</p>`;
      return;
    }

    const applicant = { name, age, dragon };
    applicants.push(applicant);
    localStorage.setItem('applicants', JSON.stringify(applicants));

    confirmation.innerHTML = `
      <p>Thank you, ${name}! Your application for a ${dragon} dragon has been received.</p>
    `;

    form.reset();
  });
});
