
let messageBox;
const selectedItems = new Set();

document.addEventListener('DOMContentLoaded', function() {
  messageBox = document.getElementById('messageBox');
  
  const checkboxesConfig = [
    { id: 'jusorange', message: 'Jus Orange frais' },
    { id: 'smoothie', message: 'Smoothie banane-fraise' },
    { id: 'eau', message: 'Eau minérale' },
    { id: 'croissant', message: 'Croissant' },
    { id: 'salade', message: 'Salade César' },
    { id: 'sandwich', message: 'Sandwich mixte' },
    { id: 'espreso', message: 'Espresso' },
    { id: 'lait', message: 'café au lait' },
    { id: 'cappusion', message: 'Cappuccino' },
    { id: 'metal', message: 'Thé métallique' },
    { id: 'specieux', message: 'Thé spécieux' },
    { id: 'safran', message: 'Thé au safran' },
    { id: 'amandes', message: 'Thé aux amandes' },
    { id: 'berbere', message: 'Thé berbère' },
    { id: 'noir', message: 'Thé noir' },
    { id: 'herbes', message: 'Thé aux herbes' }
   
  ];

  checkboxesConfig.forEach(config => {
    const checkbox = document.getElementById(config.id);
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          selectedItems.add(config.message);
        } else {
          selectedItems.delete(config.message);
        }
        updateMessageBox();
      });
    }
  });
});

function updateMessageBox() {
  if (selectedItems.size > 0) {
    messageBox.innerHTML = 'Votre demande contient :<br>' + 
      Array.from(selectedItems).map(item => `• ${item}`).join('<br>');
  } else {
    messageBox.textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const inputNumber = document.getElementById('table-number');
  const paragraphe = document.getElementById('numtable');
  
  
  inputNumber.addEventListener('input', function() {
    
    paragraphe.textContent = `le numero de table est : ${this.value}`;
    
   
    paragraphe.style.color = 'green';
    paragraphe.style.fontWeight = 'bold';
    
    
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const messageBox = document.getElementById('messageBox');
  const selections = {};
  
 
  const allSelects = ['soda', 'tacos', 'panini', 'pizza', 'glass-filtre', 'noir-zero'];
  
 
  const displayNames = {
    'soda': 'Boisson',
    'tacos': 'Tacos',
    'panini': 'Panini',
    'pizza': 'Pizza',
    'glass-filtre': 'Type de café',
    'noir-zero': 'Café spécial'
  };

  
  allSelects.forEach(selectId => {
    const select = document.getElementById(selectId);
    
    select.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      
      
      if (this.value === '' && selectedOption.text === '----') {
        delete selections[selectId];
      } else {
        selections[selectId] = {
          name: displayNames[selectId] || selectId,
          value: selectedOption.text
        };
      }
      
      updateMessageBox();
    });
  });

  function updateMessageBox() {
    let message = '\n ';
    let hasSelection = false;
    
 
    for (const [id, selection] of Object.entries(selections)) {
      if (selection.value && selection.value !== '----') {
        message += `${selection.name}: ${selection.value}\n `;
        hasSelection = true;
      }
    }
    
   
    message = message.replace(/, $/, '');
    
   
    if (hasSelection) {
      messageBOX.textContent = message;
       messageBOX.style.whiteSpace = 'pre-line';
      messageBOX.style.display = 'block';
    } else {
      messageBOX.textContent = 'Aucune sélection pour le moment';
      messageBOX.style.display = 'block';
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const demanderBtn = document.getElementById('demanderBtn');
  
  demanderBtn.addEventListener('click', function(e) {
    e.preventDefault(); 
    
  
    const numTable = document.getElementById('numtable').textContent;
    const messageBox1 = document.getElementById('messageBox').textContent;
    const messageBox2 = document.getElementById('messageBOX').textContent;
    
    
    const commandeData = {
      table: numTable.replace('Numéro de table : ', ''),
      selections: messageBox1.replace('Vos sélections :\n', ''),
      supplements: messageBox2.replace('Suppléments :\n', ''),
      timestamp: new Date().toISOString()
    };
    
    
    envoyerCommande(commandeData);
    
  
  });

  function envoyerViaFormulaire(data) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'demande.php';  
    
    for (const [key, value] of Object.entries(data)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
  }
});