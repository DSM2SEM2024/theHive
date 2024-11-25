export const Usuarios = {
    template: `  
        <h1 id="titulo">Gerenciar Usuários</h1>
        <!-- Sessão para exibir os usuários -->
        <div class="user-management">
            <button @click="openPopup" class="create-user-button">Criar Usuário</button>

            <!-- Popup de criação de usuário -->
            <div v-if="isPopupOpen" class="popup-overlay">
                <div class="popup">
                    <h3 id="titulo">Criar Usuário</h3>
                    <form>
                        <div class="form-group">
                            <label>Nome:</label>
                            <input v-model="newUser.nome" type="text" maxlength="50" required />
                        </div>
                        <div class="form-group">
                            <label>Senha:</label>
                            <input v-model="newUser.senha" type="text" maxlength="500" required /> <!-- Mostra a senha -->
                            <button class="create-btn random-password" type="button" @click="generateRandomPassword">Gerar Senha</button> <!-- Botão para gerar a senha -->
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input v-model="newUser.email" type="email" maxlength="50" required />
                        </div>
                        <div class="form-group">
                            <label>Perfil:</label>
                            <select v-model="newUser.perfil" required>
                                <option value="Professor">Professor</option>
                                <option value="Admin">Admin</option>
                                <option value="AdminMaster">AdminMaster</option>
                            </select>
                        </div>
                        <div class="modal-actions">
                            <button type="button" @click="closePopup" class="cancel-btn">Cancelar</button>
                            <button type="submit" @click="createUser" class="create-btn">Criar</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Lista de usuários criados -->
            <div class="user-list">
                <div v-for="user in users" :key="user.id_usuario" class="user-container" @click="openEditPopup(user)">
                    <p><strong>{{ user.nome }}</strong></p>
                    <p class="user-email">{{ user.email }}</p>
                    <p class="user-perfil">{{ user.perfil }}</p>

                    <!-- Botão de exclusão -->
                    <button @click.stop="confirmDelete(user.id_usuario)" class="delete-user-btn">Excluir</button>

                </div>
            </div>

                        <!-- Popup de confirmação de exclusão -->
                <div v-if="isDeletePopupOpen" class="confirmation-overlay">
                    <div class="confirmation-popup">
                        <h3 id="titulo">Confirmar Exclusão</h3>
                        <p>Você tem certeza que deseja excluir este usuário?</p>
                        <div class="popup-actions">
                            <button @click="deleteUser" class="delete-user">Sim</button>
                            <button @click="closeDeletePopup" class="cancel-btn-popup">Não</button>
                        </div>
                    </div>    
                </div>
                        <!-- Popup de edição de usuário -->
                <div v-if="isEditPopupOpen" class="popup-overlay">
                    <div class="popup">
                        <h3 id="titulo">Editar Usuário</h3>
                        <form>
                            <div class="form-group">
                                <label>Nome:</label>
                                <input v-model="editUser.nome" type="text" maxlength="50" required />
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input v-model="editUser.email" type="email" maxlength="50" required />
                            </div>
                            <div class="form-group">
                                <label>Perfil:</label>
                                <select v-model="editUser.perfil" required>
                                    <option value="Professor">Professor</option>
                                    <option value="Admin">Admin</option>
                                    <option value="AdminMaster">AdminMaster</option>
                                </select>
                            </div>
                            <div class="modal-actions">
                                <button type="button" @click="closeEditPopup" class="cancel-btn">Cancelar</button>
                                <button type="submit" @click="updateUser" class="save-btn">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            isPopupOpen: false,
            isEditPopupOpen: false,
            isDeletePopupOpen: false,  // Controle do popup de exclusão
            userToDelete: null,  // Armazenar o ID do usuário a ser excluído
            users: [], // Lista de usuários criados
            newUser: {
                nome: '',
                senha: '', // A senha será gerada aleatoriamente
                email: '',
                perfil: 'Professor', // Valor inicial padrão
                estado: true, // Valor inicial padrão (ativo)
            },
            editUser: { id_usuario: null, nome: '', email: '', perfil: '' },
        };
    },
    created() {
        this.fetchUsers(); // Carregar usuários ao inicializar o componente
    },
    methods: {
        openPopup() {
            this.isPopupOpen = true;
            this.generateRandomPassword(); // Gera uma senha aleatória ao abrir o popup
        },
        closePopup() {
            this.isPopupOpen = false;
        },
        async fetchUsers() {
            const token = localStorage.getItem('token');  // Recupera o token do localStorage
        
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho
                    }
                });
        
                if (response.ok) {
                    const users = await response.json();  // Recebe a lista de usuários
                    this.users = users;  // Atualiza a lista de usuários no frontend
                } else {
                    console.error('Erro ao carregar os usuários');
                }
            } catch (error) {
                console.error('Erro ao carregar os usuários:', error);
            }
        },
        async createUser() {
            const token = localStorage.getItem('token');  // Recupera o token do localStorage
        
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho
                    },
                    body: JSON.stringify(this.newUser),  // Envia os dados do novo usuário
                });
        
                if (response.ok) {
                    const createdUser = await response.json();  // Resposta contendo o usuário criado
                    this.users.push(createdUser);  // Adiciona o novo usuário à lista
                    this.closePopup();
                    this.resetForm();
                } else {
                    console.error('Erro ao criar usuário');
                }
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
            }
        },
        
        resetForm() {
            this.newUser = {
                nome: '',
                senha: '',
                email: '',
                perfil: 'Professor',
                estado: true,
            };
        },

        // Gera uma senha aleatória
        generateRandomPassword() {
            const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            let password = "";
            for (let i = 0; i < 12; i++) {  // 12 é o comprimento da senha gerada
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            this.newUser.senha = password;  // Atribui a senha gerada ao campo de senha
        },

        // Abre o popup de confirmação de exclusão
        confirmDelete(userId) {
            this.userToDelete = userId;
            this.isDeletePopupOpen = true;
        },

        // Fecha o popup de confirmação de exclusão
        closeDeletePopup() {
            this.isDeletePopupOpen = false;
            this.userToDelete = null;
        },

        // Exclui o usuário
        async deleteUser() {
            const token = localStorage.getItem('token');  // Recupera o token do localStorage
            try {
                const response = await fetch(`http://localhost:3000/users/${this.userToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho
                    }
                });

                if (response.ok) {
                    this.users = this.users.filter(user => user.id_usuario !== this.userToDelete);  // Remove o usuário da lista
                    this.closeDeletePopup();
                } else {
                    console.error('Erro ao excluir o usuário');
                }
            } catch (error) {
                console.error('Erro ao excluir o usuário:', error);
            }
        },
        openEditPopup(user) {
            this.editUser = { ...user };
            this.isEditPopupOpen = true;
        },
        closeEditPopup() {
            this.isEditPopupOpen = false;
        },
        async updateUser() {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            try {
                const response = await fetch(`http://localhost:3000/users/${this.editUser.id_usuario}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
                    },
                    body: JSON.stringify({
                        nome: this.editUser.nome,
                        email: this.editUser.email,
                        perfil: this.editUser.perfil,
                    }), // Envia apenas os campos editáveis
                });
        
                if (response.ok) {
                    const updatedUser = await response.json();
                    const index = this.users.findIndex(user => user.id_usuario === updatedUser.id_usuario);
                    if (index !== -1) {
                        this.users.splice(index, 1, updatedUser); // Substitui o usuário atualizado na lista
                    }
                    this.closeEditPopup(); // Fecha o popup de edição
                } else {
                    console.error('Erro ao atualizar o usuário');
                }
            } catch (error) {
                console.error('Erro ao atualizar o usuário:', error);
            }
        },   
    },
}
