document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input')
    const addTaskBtn = document.getElementById('add-task')
    const taskList = document.getElementById('task-list')
    const emptyImage = document.getElementById('empty-image')
    const todoContainer = document.querySelector('.todos-container')
    const progressBar = document.getElementById('progress')
    const progressNumbers = document.getElementById('numbers')

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none'
        todoContainer.style.width = taskList.children.length === 0 ? '100%' : '50%'
    }

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length

        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%'
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`

        if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            confetti()
            alert('Congratulations! All tasks are completed.') //probar a ver que tal
    }

        if (totalTasks === 0) {
            progressBar.style.width = '0%'
            progressNumbers.textContent = '0%'
            return
        }

        const completionPercentage = Math.round((completedTasks / totalTasks) * 100)
        progressBar.style.width = `${completionPercentage}%`
        progressNumbers.textContent = `${completionPercentage}%`

        if (checkCompletion && completionPercentage === 100) {
            alert('Congratulations! All tasks are completed.')
        }
    }

    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim()
        if (!taskText) {
            return
        }

        const li = document.createElement('li')
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>` //agregar, buscar los iconos

        const checkbox = li.querySelector('.checkbox')
        const editBtn = li.querySelector('.edit-btn')

        if (completed) {
            li.classList.add('completed')
            editBtn.disabled = true
            editBtn.style.opacity = '0.5'
            editBtn.style.pointerEvents = 'none'
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked
            li.classList.toggle('completed', isChecked)
            editBtn.disabled = isChecked
            editBtn.style.opacity = isChecked ? '0.5' : '1'
        })

        editBtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent
                li.remove()
                toggleEmptyState()
                updateProgress(false)
            }
        })

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove()
            toggleEmptyState()
            updateProgress()
        })

        taskList.appendChild(li)
        taskInput.value = ''
        toggleEmptyState()
        updateProgress(checkCompletion)
    }

    addTaskBtn.addEventListener('click', () => addTask())
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTask()
        }
    })
})

const confettiEffect = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}