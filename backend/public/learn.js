// public/learn.js

fetch('/api/modules')
  .then(response => response.json())
  .then(modules => {
    const container = document.getElementById('moduleList');

    modules.forEach(module => {
      const div = document.createElement('div');
      div.className = 'module';

      div.innerHTML = `
        <h3>${module.title}</h3>
        <p>${module.description}</p>
        <p><strong>Jumlah Pelajaran:</strong> ${module.lessons}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Gagal memuat modul:', err);
    document.getElementById('moduleList').innerHTML = '<p>Gagal memuat modul.</p>';
  });
