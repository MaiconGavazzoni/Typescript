# Typescript

# Projeto Realizado no curso Rocketseat Ignite 

# Cadastro de carro
**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**Regras de negócios**
Não de ser possível cadastrar um carro com uma placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão,, com disponibilidade
O usuário responável pelo cadastro deve ser um usuário administrador

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros pelo nome da marca
Deve ser possível listar todos os carros pelo nome da Categoria
Deve ser possível listar todos os carros pelo nome do carro
**Regras de negócios**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação
**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as escificações

**Regras de negócios**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário responável pelo cadastro deve ser um usuário administrador

# cadastro de imagens do carro

**Requisitos funcionais**
Deve ser possível cadastrar a imagem do carro

**Requisitos não funcionais**
Utilizar o multer para upload dos arquivos

**Regras de negócios**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel

**Regras de negócios**
O aluguel deve ter no mínimo 24horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um  aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um  aberto para o mesmo carro
