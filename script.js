function setupTasks() {
  const numTasks = document.getElementById('numTasks').value;
  const tasksInput = document.getElementById('tasksInput');
  tasksInput.innerHTML = '';

  for (let i = 1; i <= numTasks; i++) {
    tasksInput.innerHTML += `
      <div>
        <label for="task${i}_period">Tarefa ${i} - Período:</label>
        <input type="number" id="task${i}_period" placeholder="Período em ms">
        <label for="task${i}_execution">Tempo de Execução:</label>
        <input type="number" id="task${i}_execution" placeholder="Tempo de execução em ms">
      </div>
    `;
  }
}

function checkSchedulability() {
  const numTasks = document.getElementById('numTasks').value;
  const tasks = [];
  // somatório dos tempos de processamento sobre os períodos das tarefas
  let sum = 0;
  // Variável para calcular a diferença crítica (D) com base no número de tarefas
  let D = numTasks * (Math.pow(2, 1 / numTasks) - 1);

  // Loop para calcular o somatório dos tempos de processamento sobre os períodos das tarefas
  for (let i = 1; i <= numTasks; i++) {
    // Obtém o período e o tempo de execução da tarefa atual
    const period = parseInt(document.getElementById(`task${i}_period`).value);
    const execution = parseInt(document.getElementById(`task${i}_execution`).value);
    // Calcula a utilização da CPU para a tarefa atual e adiciona ao somatório
    sum += execution / period;
}

  let resultExplanation = '';
  if (sum <= D) {
      resultExplanation = `O algoritmo Rate-Monotonic determina que as tarefas são escalonáveis. O somatório dos tempos de processamento sobre os períodos das tarefas (${sum.toFixed(3)}) é menor ou igual a ${D.toFixed(3)}. Isso significa que as tarefas podem ser agendadas de forma eficiente sem violar os prazos estabelecidos. Os cálculos mostram que cada tarefa está sendo executada em um tempo adequado em relação ao seu período, garantindo uma distribuição equilibrada do processamento. A diferença crítica (D) é calculada para garantir que o sistema possa lidar com a carga de processamento de todas as tarefas dentro de seus períodos, evitando a sobrecarga do processador.`;
  } else {
      resultExplanation = `O algoritmo Rate-Monotonic determina que as tarefas NÃO são escalonáveis. O somatório dos tempos de processamento sobre os períodos das tarefas (${sum.toFixed(3)}) excede ${D.toFixed(3)}. Isso significa que as tarefas não podem ser agendadas de forma eficiente. Os cálculos mostram que o processamento necessário para completar as tarefas excede a capacidade do sistema, o que pode levar a atrasos e violações de prazos, comprometendo a execução adequada do sistema em tempo real. A diferença crítica (D) é uma medida de segurança que define um limite para garantir que o processador não seja sobrecarregado e que todas as tarefas possam ser concluídas dentro de seus períodos.`;
  }

  const resultElement = document.getElementById('result');
  resultElement.textContent = resultExplanation + `Ela representa um limite superior seguro para o somatório dos tempos de processamento sobre os períodos das tarefas, evitando a sobrecarga do processador e garantindo a execução das tarefas dentro de seus prazos.`;
}  