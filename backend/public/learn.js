// public/learn.js

// === Load semua kategori modul (ISO 27001, OWASP, dll) ===
fetch('/api/modules')
  .then(response => response.json())
  .then(modules => {
    const container = document.getElementById('moduleList');

    if (!container) {
      console.error('Elemen dengan id "moduleList" tidak ditemukan di HTML!');
      return;
    }

    modules.forEach(category => {
      const div = document.createElement('div');
      div.className = 'module';

      div.innerHTML = `
        <h3>${category.categoryTitle}</h3>
        <p>${category.description}</p>
        <p><strong>Jumlah Pelajaran:</strong> klik untuk lihat</p>
        <button onclick="loadModule('${category.id}')">Lihat Modul</button>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Gagal memuat modul:', err);
    document.getElementById('moduleList').innerHTML = '<p>Gagal memuat modul.</p>';
  });


// === Load semua modul dalam kategori tertentu ===
function loadModule(categoryId) {
  fetch(`/api/modules/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('moduleList');
      if (!container) return;

      container.innerHTML = `
        <button class="back-button" onclick="location.reload()">← Kembali ke Kategori</button>
        <h2>${data.categoryTitle}</h2>
      `;

      data.modules.forEach(modul => {
        const div = document.createElement('div');
        div.className = 'module';

        div.innerHTML = `
          <h4>${modul.title}</h4>
          <p>${modul.description}</p>
          <p><strong>Total Pelajaran:</strong> ${modul.totalLessons}</p>
          <button onclick="loadLesson('${categoryId}', '${modul.id}')">Lihat Pelajaran</button>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Gagal memuat modul:', err);
      document.getElementById('moduleList').innerHTML = '<p>Gagal memuat modul.</p>';
    });
}


// === Load daftar pelajaran dari sebuah modul ===
function loadLesson(categoryId, moduleId) {
  fetch(`/api/modules/${categoryId}/${moduleId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('moduleList');
      if (!container) return;

      container.innerHTML = `
        <button class="back-button" onclick="loadModule('${categoryId}')">← Kembali ke Modul</button>
        <h2>${data.moduleTitle}</h2>
      `;

      data.lessons.forEach(lesson => {
        const div = document.createElement('div');
        div.className = 'module';

        div.innerHTML = `
          <h4>${lesson.title}</h4>
          <button onclick="loadLessonContent('${categoryId}', '${moduleId}', '${lesson.id}')">Lihat Konten</button>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Gagal memuat pelajaran:', err);
      document.getElementById('moduleList').innerHTML = '<p>Gagal memuat pelajaran.</p>';
    });
}


// === Load konten dari pelajaran tertentu ===
function loadLessonContent(categoryId, moduleId, lessonId) {
  fetch(`/api/modules/${categoryId}/${moduleId}/${lessonId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('moduleList');
      if (!container) return;

      container.innerHTML = `
        <button class="back-button" onclick="loadLesson('${categoryId}', '${moduleId}')">← Kembali ke Pelajaran</button>
        <h2>${data.title}</h2>
      `;

      data.content.forEach(block => {
        const el = document.createElement(getElementTag(block.type));

        if (block.type === 'list') {
          const ul = document.createElement('ul');
          block.text.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          container.appendChild(ul);
        } else if (block.type === 'code') {
          el.textContent = block.text;
          el.style.background = '#f4f4f4';
          el.style.padding = '10px';
          el.style.borderRadius = '5px';
          el.style.fontFamily = 'monospace';
          container.appendChild(el);
        } else {
          el.textContent = block.text;
          container.appendChild(el);
        }
      });
    })
    .catch(err => {
      console.error('Gagal memuat konten pelajaran:', err);
      document.getElementById('moduleList').innerHTML = '<p>Gagal memuat konten pelajaran.</p>';
    });
}


// === Helper: menentukan tag HTML berdasarkan jenis konten ===
function getElementTag(type) {
  switch (type) {
    case 'paragraph': return 'p';
    case 'heading': return 'h3';
    case 'code': return 'pre';
    default: return 'p';
  }
}
