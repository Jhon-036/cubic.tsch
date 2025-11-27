import LoginForm from "../Components/Forms/LoginForm"

const Login = () => {
  return (
    <main className="bg-[url('public/fondo_login.jpg')] ">
      <article className="bg-[#000000a1] bg-center bg-cover bg-no-repeat">
        <div className=" w-[80%] h-screen m-auto flex items-center justify-center gap-20">
          <section>
            <img 
              src="public/logo.png" 
              alt="Tschperu" 
              className="w-56"
            />
          </section>
          <section>
            <LoginForm />
          </section>
        </div>
      </article>
    </main>
  )
}
export default Login