document.addEventListener('DOMContentLoaded', () => {
  
  const messageBoxSelections = document.getElementById('messageBox');
  const messageBoxSupplements = document.getElementById('messageBOX');
  const numTableElement = document.getElementById('numtable');
  const demanderBtn = document.getElementById('demanderBtn');
  const tableNumberInput = document.getElementById('table-number');

  const selectedItems = new Set();
  const selections = {};
  
  const checkboxesConfig = [
    { id: 'jusorange', message: 'Jus Orange frais' },
    { id: 'smoothie', message: 'Smoothie banane-fraise' },
    { id: 'eau', message: 'Eau minérale' },
    { id: 'croissant', message: 'Croissant' },
    { id: 'salade', message: 'Salade' },
    { id: 'sandwich', message: 'Sandwich mixte' },
    { id: 'espreso', message: 'Espresso' },
    { id: 'lait', message: 'Café au lait' },
    { id: 'cappusion', message: 'Cappuccino' },
    { id: 'metal', message: 'Thé métallique' },
    { id: 'specieux', message: 'Thé spécieux' },
    { id: 'safran', message: 'Thé au safran' },
    { id: 'amandes', message: 'Thé aux amandes' },
    { id: 'berbere', message: 'Thé berbère' },
    { id: 'noir', message: 'Thé noir' },
    { id: 'herbes', message: 'Thé aux herbes' }
  ];
  
  checkboxesConfig.forEach(({ id, message }) => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selectedItems.add(message);
        } else {
          selectedItems.delete(message);
        }
        updateSupplementsBox();
      });
    }
  });

  function updateSupplementsBox() {
    if (selectedItems.size > 0) {
      messageBoxSupplements.innerHTML = 'Suppléments :<br>' + Array.from(selectedItems).map(item => `• ${item}`).join('<br>');
    } else {
      messageBoxSupplements.textContent = '';
    }
  }

  
  if (tableNumberInput && numTableElement) {
    tableNumberInput.addEventListener('input', () => {
      numTableElement.textContent = `Numéro de table : ${tableNumberInput.value}`;
      numTableElement.style.color = 'green';
      numTableElement.style.fontWeight = 'bold';
    });
  }
  
  const allSelects = ['soda', 'tacos', 'panini', 'pizza', 'glass-filtre', 'noir-zero'];
  const displayNames = {
    'soda': 'Boisson',
    'tacos': 'Tacos',
    'panini': 'Panini',
    'pizza': 'Pizza',
    'glass-filtre': 'Type de café',
    'noir-zero': 'Café spécial'
  };

  allSelects.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', () => {
        const option = select.options[select.selectedIndex];
        if (select.value === '' || option.text === '----') {
          delete selections[id];
        } else {
          selections[id] = {
            name: displayNames[id] || id,
            value: option.text
          };
        }
        updateSelectionsBox();
      });
    }
  });

  function updateSelectionsBox() {
    const selectedEntries = Object.values(selections);
    if (selectedEntries.length > 0) {
      messageBoxSelections.innerHTML = 'Vos sélections :<br>' + 
        selectedEntries.map(s => `• ${s.name}: ${s.value}`).join('<br>');
    } else {
      messageBoxSelections.textContent = 'Aucune sélection pour le moment';
    }
  }
  
  if (demanderBtn) {
    demanderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const tableNumber = tableNumberInput ? tableNumberInput.value : '';
      if (!tableNumber) {
        alert('Veuillez entrer un numéro de table.');
        return;
      }
      
      const hasSelections = Object.keys(selections).length > 0 || selectedItems.size > 0;
      if (!hasSelections) {
        alert('Veuillez sélectionner au moins un article.');
        return;
      }
      
      const commandeData = {
        table: tableNumber,
        selections: Object.values(selections).map(s => `${s.name}: ${s.value}`).join(', '),
        supplements: Array.from(selectedItems).join(', '),
        timestamp: new Date().toLocaleString()
      };

      envoyerCommande(commandeData);
    });
  }

  function envoyerCommande(data) {
    fetch('save_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'success') {
        alert('Commande envoyée avec succès!');
        
        selectedItems.clear();
        Object.keys(selections).forEach(key => delete selections[key]);
        updateSelectionsBox();
        updateSupplementsBox();
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
      } else {
        alert('Erreur lors de l\'envoi de la commande');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Erreur lors de l\'envoi de la commande');
    });
  }
});