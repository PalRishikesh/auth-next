export default function UserProfile({params}:any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>USer Profile</h1>
        <hr/>
        <p>USer Profile Page for {params.id}</p>
    </div>
    )
}