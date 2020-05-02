Proiect Delicios - Local Setup
### Installing

Prerequisites
#### XAMPP from https://www.apachefriends.org/index.html
#### COMPOSER from https://getcomposer.org/
#### Visual Studio Code from https://code.visualstudio.com/
#### Node from https://nodejs.org/en/
#### GIT from https://git-scm.com/downloads
##### Note: Select Use Git and option Unix tools from the Command Prompt when asked ( last option)

Now that you have everything set up, follow the next stepts  
### 1. Set Git Bash as VSCode default terminal
#### 1.1. Open Visual Studio Code and from the menu choose File -> Preferences -> Settings. This will open a settings tab with a search bar  
#### 1.2. Type Automation Shell: Windows in the search bar  
#### 1.3. Click on the first Edit in setting.json that you see, this will open a new tab  
#### 1.4. Add the following line there: "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"  
##### Note: Add that as an item in the {} so don't forget the comma after the previous line  

### 2. Make a GitHub account and accept the Collaboration invite from email ( ask Ionut for invite after you have a GitHub account)

### 3. You need to copy the project locally
##### 3.1. Open Git Bash Terminal and run the following commands
##### 3.2. cd ../../xampp/htdocs
##### 3.3. git clone https://github.com/pinteionut/proiect-delicios.git
##### 3.4. cd proiect-delicios
##### 3.5. composer install
##### 3.6. When this is finished ( it might take a while) you can close the terminal and open the folder of the project in Visual Studio code and CTRL + ` to open a terminal
##### 3.6. In this terminal run the following commands
##### 3.7. npm install
##### 3.8. cp .env.example .env
##### 3.9. php artisan key:generate

### 4. Now we need to create an empty db for the application
##### 4.1. Open XAMPP Control Panel and Start Apache and MySQL
##### 4.2. In your browser go to http://localhost/phpmyadmin/
##### 4.3. On the left panel click new, add proiectdelicios in Datanase Name and click on Create
##### 4.4. Open the project folder in VSCode
##### 4.5. Open the .env file
##### 4.6. Change APP_NAME from Laravel to ProiectDelicios
##### 4.7. Change DB_DATABASE from laravel to proiectdelicios
##### 4.8. CTRL + ` to open a terminal
##### 4.9. php artisan migrate

### 5. We are almost done!
##### 5.1. Open Notepad with Run as administrator click on File -> Open and search for https-vhosts.conf file in C > xampp > apache > conf > extra. Make sure that you have selected All Files in the dropdown from right down
##### Add the following text at the end of the file and save it

````
<VirtualHost *:80>  
    DocumentRoot "C:/xampp/htdocs"  
    ServerName localhost  
</VirtualHost>  

<VirtualHost *:80>  
    DocumentRoot "C:/xampp/htdocs/proiect-delicios/public"  
    ServerName local.proiectdelicios.com  
</VirtualHost>  
````

##### 5.2. Open Notepad with Run as administrator click on File -> Open and search for hosts file in C > Windows > System 32 > drivers > etc. Make sure that you have selected All Files in the dropdown from right down
##### Add the following text at the end of the file and save it

````
127.0.0.1 localhost
127.0.0.1 local.proiectdelicios.com
````

#### 6 Open XAMPP Control Panel and restart Apache ( Stop then Start)

#### 7 Visit local.proiectdelicios.com in your browser, it should work!

#### Now let's try to push your first modifications on the remote repository
#### 1. Open the project folder in VSCode
#### 2. CTRL + ` to open the terminal
#### 3. In terminal run, wehere name is your name (ex. test-ionut): git checkout -b test-name
#### 4. Modifiy something in the project, this won't pe applied anyway so for example add something in the README.md file and save
#### 5. In terminal run: git add .
#### 6. In terminal run: git commit
#### 7. Now vim is open so press "i" key to inster and write "My first commit" now press "esc" key and type ":wq!" then enter
#### 8. Now run, don't forget to change name with yogit ur name: git push origin test-name
#### 9. Visit the link from the terminal with the new pull request things
#### 10. Click on Compare and Create Pull Request
#### 11. On the right panel click on assign yourself
#### 12. Click on Create Pull Request. That's it! For now :D
