use anchor_lang::prelude::*;

// Program ID
declare_id!("FFL87RjGPGkuZmtvhyXMW2SadX5tYWfKd9wXK6gx35Lk");

#[program]
pub mod solana_gifs_portal {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account; // mutable reference
    // Initialize total_gifs.
    base_account.total_gifs = 0;
    Ok(())
  }

  pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;

	  // Build the struct.
    let item = ItemStruct {
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
    };
		
	  // Add it to the gif_list vector.
    base_account.gif_list.push(item);
    base_account.total_gifs += 1;
    Ok(())
  }
}

// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)] // How we want to initialize BaseAccount
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>, //  The SystemProgram is a program the creators of Solana deployed that other programs like ours talk to
}

// Attach certain variables to the AddGif context.
// These are the "parameters" of the function
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)] // Access to a mutable reference to base_account
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
	  // Attach a Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}
